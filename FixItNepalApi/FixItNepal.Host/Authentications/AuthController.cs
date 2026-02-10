using FixItNepal.Application.Contracts.Authentications;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.Authentications;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService)
    : ControllerBase
{
    
    [Route("/login")]
    public async Task<LoginDto> LoginAsync(LoginInputDto input)
    {
        var result = await authService.LoginAsync(input);
        return result;
    }
}