using System.Security.Claims;
using FixItNepal.Application.Contracts.AppUsers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.AppUsers;

[ApiController]
[Route("api/[controller]")]
public class AppUserController(
    IAppUserService appUserService
    ):ControllerBase
{
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetMeAsync()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var role   = User.FindFirstValue(ClaimTypes.Role)!;

        Console.WriteLine($"UserId: {userId}");
        Console.WriteLine($"Role from token: '{role}'");
        
        var dto =  await appUserService.GetUserProfileAsync(userId, role);
        return Ok(dto);
    }
}