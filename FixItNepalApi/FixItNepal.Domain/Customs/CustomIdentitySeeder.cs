using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using Microsoft.Extensions.DependencyInjection;

namespace FixItNepal.Domain.Customs;

public class CustomIdentitySeeder 
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();

        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

        var superAdminEmail = ApiConst.AppSuperAdminEmail;
        var superAdminPhone = ApiConst.AppSuperAdminPhone;
        var superAdminPassword = ApiConst.AppSuperAdminPassword;
        
        var user = await userManager.FindByEmailAsync(superAdminEmail);
        if (user == null)
        {
            user = new AppUser
            {
                UserName = superAdminEmail,
                Email = superAdminEmail,
                PhoneNumber = superAdminPhone,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(user, superAdminPassword);
            if (!result.Succeeded)
            {
                throw new Exception(
                    "Failed to create SuperAdmin: " + string.Join(", ", result.Errors.Select(e => e.Description))
                );
            }
        }
        
       
        // Create roles
        string[] roles = new[]
        {
            ApiConst.AppSuperAdminRoleName,
            ApiConst.AppGarageRoleName,
            ApiConst.AppCustomerRoleName,
            ApiConst.AppMechanicRoleName
        };

        foreach (var roleName in roles)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
                await roleManager.CreateAsync(new IdentityRole<Guid>(roleName));
        }

        // Assign SuperAdmin role
        if (!await userManager.IsInRoleAsync(user, ApiConst.AppSuperAdminRoleName))
        {
            await userManager.AddToRoleAsync(user, ApiConst.AppSuperAdminRoleName);
        }
        
    }
}