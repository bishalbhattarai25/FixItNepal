using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FixItNepal.Application.Contracts.Authentications;
using FixItNepal.Domain.AppUsers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FixItNepal.Application.Authentications;

public class AuthAppService(
    UserManager<AppUser> userManager,
    IConfiguration configuration
    ) : IAuthService
{
    public Task<RegisterDto> RegisterAsync(RegisterInputDto input)
    {
        throw new NotImplementedException();
    }

    public async Task<LoginDto> LoginAsync(LoginInputDto input)
    {

        var user = await userManager.Users
            .FirstOrDefaultAsync(u => u.PhoneNumber == input.PhoneNumber);

        if (user == null)
            throw new Exception("Invalid phone number or password");

        var validPassword = await userManager.CheckPasswordAsync(user, input.Password);
        if (!validPassword)
            throw new Exception("Invalid phone number or password");

        var roles = await userManager.GetRolesAsync(user);

        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.MobilePhone, user.PhoneNumber!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        authClaims.AddRange(
            roles.Select(role => new Claim(ClaimTypes.Role, role))
        );

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!)
        );

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Audience"],
            expires: DateTime.UtcNow.AddMinutes(
                double.Parse(configuration["Jwt:ExpiryMinutes"]!)
            ),
            claims: authClaims,
            signingCredentials: new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            )
        );

        return new LoginDto
        {
            UserId = user.Id,
            AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
            ExpireAt = token.ValidTo,
            Role = roles.FirstOrDefault() ?? "User"
        };
    }

}