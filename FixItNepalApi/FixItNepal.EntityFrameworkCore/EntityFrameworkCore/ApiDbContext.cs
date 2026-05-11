using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.MediaFiles;
using FixItNepal.Domain.OpeningHours;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared;
using FixItNepal.Domain.Shared.Addresses;
using FixItNepal.Domain.Vehicles;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.EntityFrameworkCore.EntityFrameworkCore;

public class ApiDbContext: IdentityDbContext<AppUser,IdentityRole<Guid>, Guid>
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
        
    }
    
    //garages
    public DbSet<Garage> Garages { get; set; }
    public DbSet<GarageMediaFile> GarageMediaFiles { get; set; }
    
    //mechanics
    public DbSet<Mechanic> Mechanics { get; set; }
    public DbSet<MechanicMediaFile> MechanicMediaFiles { get; set; }
    
    //customers
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<MediaFile> MediaFiles { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    
    //service-requests
    public DbSet<ServiceRequest>  ServiceRequests { get; set; }
    
    //openinghour
    public DbSet<OpeningHour>  OpeningHours { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // ******************* Garage *********************** //
        
        #region Garage
        
        builder.Entity<Garage>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(Garages));

            b.HasOne(g => g.Address);
            
            b.Property(x => x.ApprovalStatus)
                .HasConversion<string>();


            b.HasOne(m => m.Logo)
                .WithOne()
                .HasForeignKey<Garage>(m => m.LogoId)
                .OnDelete(DeleteBehavior.Cascade);
            
            b.Navigation(g => g.Address)
                .AutoInclude();
            
            b.Navigation(g => g.Logo)
                .AutoInclude();
            b.Navigation(g => g.GarageMediaFiles)
                .AutoInclude();

            b.HasMany(x => x.OpeningHours)
                .WithOne()
                .HasForeignKey(x => x.ServiceProviderId)
                .OnDelete(DeleteBehavior.Cascade);
            
            b.Navigation(x => x.OpeningHours)
                .AutoInclude();

        });
        
          
        builder.Entity<GarageMediaFile>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(GarageMediaFiles));
            
            b.HasOne(g => g.Garage)
                .WithMany(g => g.GarageMediaFiles)
                .HasForeignKey(g => g.GarageId)
                .OnDelete(DeleteBehavior.Cascade);
            
            b.HasOne(gmf => gmf.MediaFile)
                .WithMany()
                .HasForeignKey(gmf => gmf.MediaFileId)
                .OnDelete(DeleteBehavior.Restrict);

        });
        
        #endregion
        
        // ******************* Mechanic *********************** //
        
        builder.Entity<Mechanic>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(Mechanics));
            
            b.HasOne(g => g.Address);
            
            b.HasOne(m => m.Logo)
                .WithOne()
                .HasForeignKey<Mechanic>(m => m.LogoId)
                .OnDelete(DeleteBehavior.Cascade);
            
            b.Property(x => x.ApprovalStatus)
                .HasConversion<string>();
            
            b.Navigation(g => g.Logo)
                .AutoInclude();
            
            b.Navigation(g => g.MechanicMediaFiles)
                .AutoInclude();
                 
            b.Navigation(g => g.Address)
                .AutoInclude();

        });
        
        builder.Entity<MechanicMediaFile>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(MechanicMediaFiles));
            
            b.HasOne(g => g.Mechanic)
                .WithMany(g => g.MechanicMediaFiles)
                .HasForeignKey(g => g.MechanicId)
                .OnDelete(DeleteBehavior.Cascade);
            
            b.HasOne(gmf => gmf.MediaFile)
                .WithMany()
                .HasForeignKey(gmf => gmf.MediaFileId)
                .OnDelete(DeleteBehavior.Restrict);

        });
        
        // ****************** Customer ******************** //
        
        builder.Entity<Customer>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(Customers));
            
        });
        builder.Entity<Address>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(Addresses));
        });
        
        // --------------MediaFile --------------------- //
        
        builder.Entity<MediaFile>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(MediaFiles));

            b.Property(x => x.FileType)
                .HasConversion<string>();
        });
        
        // --------------Vehicle --------------------- //
        builder.Entity<Vehicle>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(Vehicles));

            b.HasOne(x => x.Customer)
                .WithMany(x => x.Vehicles)
                .HasForeignKey(x => x.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);
            
            b.Property(x => x.VehicleType)
                .HasConversion<string>();
            
            b.Property(x => x.FuelType)
                .HasConversion<string>();
        });
        
        builder.Entity<ServiceRequest>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(ServiceRequests));

            // b.HasOne(b => b.Address);
            
            b.Property(x => x.ProblemType)
                .HasConversion<string>();
            
            b.Property(x => x.RequestType)
                .HasConversion<string>();
            
            b.Property(x => x.Status)
                .HasConversion<string>();
            
            b.Property(x => x.ServiceProviderType)
                .HasConversion<string>();
            
            
            b.HasOne(x => x.Customer)
                .WithMany(x => x.ServiceRequests)
                .HasForeignKey(x => x.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<ServiceRequest>()
                .Property(x => x.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken()
                .ValueGeneratedOnAddOrUpdate();
            
            // b.Navigation(b => b.Address)
            //     .AutoInclude();

            b.Navigation(x => x.Customer)
                .AutoInclude();
        });

        builder.Entity<OpeningHour>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(OpeningHours));
            
            b.Property(x => x.ServiceProviderType)
                .HasConversion<string>();

            b.HasIndex(x => x.ServiceProviderId);
            
            b.HasOne(x => x.Garage)
                .WithMany(x => x.OpeningHours)
                .HasForeignKey(x => x.ServiceProviderId)
                .OnDelete(DeleteBehavior.Cascade);
        });

    }
}