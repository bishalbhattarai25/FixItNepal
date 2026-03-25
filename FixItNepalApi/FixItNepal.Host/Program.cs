using System.Text;
using CloudinaryDotNet;
using FixItNepal.Application.AppUsers;
using FixItNepal.Application.AutomapperProfiles;
using FixItNepal.Application.Contracts.AppUsers;
using FixItNepal.Application.Contracts.Customs.Email;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Application.Customs.Email;
using FixItNepal.Application.Extensions;
using FixItNepal.Application.ServiceRequests;
using FixItNepal.Application.ServiceRequests.Hub;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customs;
using FixItNepal.Domain.Customs.Emailer;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.EntityFrameworkCore.EntityFrameworkCore;
using FixItNepal.EntityFrameworkCore.Garages;
using FixItNepal.EntityFrameworkCore.Mechanics;
using FixItNepal.EntityFrameworkCore.Repository;
using FixItNepal.EntityFrameworkCore.Repository.UnitOfWork;
using FixItNepal.EntityFrameworkCore.ServiceRequests;
using FixItNepal.Host.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);
var env = builder.Environment;

// Add services to the container.
builder.Services.AddApplicationServices();

var connectionString = Environment.GetEnvironmentVariable("MYSQL_CONNECTION")
                       ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(
            connectionString
        ),
        mySqlOptions =>
        {
            mySqlOptions.MigrationsAssembly(
                "FixItNepal.EntityFrameworkCore"
            );
            mySqlOptions.UseNetTopologySuite();
        }
    )
);

builder.Services.AddIdentity<AppUser, IdentityRole<Guid>>(options => 
        options.Tokens.ChangePhoneNumberTokenProvider = TokenOptions.DefaultPhoneProvider
    ).AddEntityFrameworkStores<ApiDbContext>();

//signalr

builder.Services.AddSignalR()
    .AddJsonProtocol(options =>
    {
        options.PayloadSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter()
        );
    });
builder.Services.AddScoped<IRequestNotifier, LiveRequestNotifier>();
builder.Services.AddScoped<IServiceProviderNotifier, LiveServiceProviderNotifier>();

//repository 
builder.Services.AddScoped(typeof(IRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IMechanicRepository, MechanicRepository>();
builder.Services.AddScoped<IGarageRepository, GarageRepository>();
builder.Services.AddScoped<IServiceRequestRepository, ServiceRequestRepository>();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters
        .Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
});
builder.Services.Configure<RouteOptions>(options => { options.LowercaseUrls = true; });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(GarageAutomapperProfile).Assembly);
builder.Services.AddSingleton(new Cloudinary(
    new Account(
        builder.Configuration["Cloudinary:CloudName"],
        builder.Configuration["Cloudinary:ApiKey"],
        builder.Configuration["Cloudinary:ApiSecret"]
    )
));

//razor 
builder.Services.AddRazorPages();

//email sender
builder.Services.AddTransient<IEmailerService, EmailSender>();
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));

var templateRoot = Path.Combine(env.ContentRootPath, "Resource", "Templates");

builder.Services.AddScoped<IAppUserEmailer>(sp =>
{
    var emailSender = sp.GetRequiredService<IEmailerService>();
    return new AppUserAccountEmailer(templateRoot, emailSender);
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
            )
        };
    });

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "FixItNepal API",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter: Bearer {your JWT token}"
    });
    //
    // options.AddSecurityRequirement(doc => new OpenApiSecurityRequirement
    // {
    //     {
    //         new OpenApiSecurityScheme
    //         {
    //             Reference = new OpenApiReference
    //             {
    //                 Type = ReferenceType.SecurityScheme,
    //                 Id = "Bearer"
    //             },
    //             Scheme = "bearer",
    //             Name = "Authorization",
    //             In = ParameterLocation.Header
    //         },
    //         Array.Empty<string>()
    //     }
    // });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
                origin.StartsWith("http://localhost") ||
                origin.StartsWith("https://fix-it-nepal")
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction() )
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "FixItNepal API V1")
    );
}


app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");

app.UseMiddleware<GlobalExceptionHandler>();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapRazorPages();
app.MapHub<LiveRequestHub>("/liveStatusHub");
app.MapHub<LiveServiceProviderHub>("/liveServiceProviderHub");

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApiDbContext>();

    // Apply migrations
    dbContext.Database.Migrate();

    // Seed data
    await CustomIdentitySeeder.SeedAsync(scope.ServiceProvider);
}

app.Run();