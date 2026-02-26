using System.Text;
using CloudinaryDotNet;
using FixItNepal.Application.AutomapperProfiles;
using FixItNepal.Application.Extensions;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customs;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.EntityFrameworkCore.EntityFrameworkCore;
using FixItNepal.EntityFrameworkCore.Repository;
using FixItNepal.EntityFrameworkCore.Repository.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddIdentity<AppUser, IdentityRole<Guid>>().AddEntityFrameworkStores<ApiDbContext>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
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
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
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

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApiDbContext>();

    // Apply migrations
    dbContext.Database.Migrate();

    // Seed data
    await CustomIdentitySeeder.SeedAsync(scope.ServiceProvider);
}

app.Run();