using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.MediaFiles;
using FixItNepal.Domain.Shared;
using FixItNepal.Domain.Shared.Addresses;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.EntityFrameworkCore.EntityFrameworkCore;

public class ApiDbContext: IdentityDbContext<AppUser,IdentityRole<Guid>, Guid>
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Garage> Garages { get; set; }
    public DbSet<Mechanic> Mechanics { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<MediaFile> MediaFiles { get; set; }
    
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
            
            b.Navigation(g => g.Address)
                .AutoInclude();

        });
        
        #endregion
        
        // ******************* Mechanic *********************** //
        
        builder.Entity<Mechanic>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(Mechanics));
            
            b.HasOne(g => g.Address);
            
            b.Property(x => x.ApprovalStatus)
                .HasConversion<string>();
            
                 
            b.Navigation(g => g.Address)
                .AutoInclude();

        });
        builder.Entity<Customer>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(Customers));
            
        });
        builder.Entity<Address>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(Addresses));
            
            b.Property(a => a.LocationCoordinatePoint)
                .HasColumnType(AddressConst.PointTypeInMySQL); 
        });
        
        // --------------MediaFile --------------------- //
        
        builder.Entity<MediaFile>(b =>
        {
            b.ToTable(ApiConst.DbTablePrefix + nameof(MediaFiles));

            b.Property(x => x.FileType)
                .HasConversion<string>();
        });
    }
}