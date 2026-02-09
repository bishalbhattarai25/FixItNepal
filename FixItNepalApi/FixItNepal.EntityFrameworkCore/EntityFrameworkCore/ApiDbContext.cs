using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Mechanics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.EntityFrameworkCore.EntityFrameworkCore;

public class ApiDbContext: IdentityDbContext<AppUser>
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Garage> Garages { get; set; }
    public DbSet<Mechanic> Mechanics { get; set; }
    public DbSet<Customer> Customers { get; set; }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Garage>(
        );
        
        builder.Entity<Mechanic>(
        );
        
        builder.Entity<Customer>(
            
        );
    }
}