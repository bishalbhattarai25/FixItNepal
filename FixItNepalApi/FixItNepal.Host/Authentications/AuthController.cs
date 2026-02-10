using FixItNepal.Application.Contracts.Authentications;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.Authentications;

public class AuthController(IAuthService authService)
    : ControllerBase
{
    public async Task<LoginDto> LoginAsync(LoginInputDto input)
    {
        var result = await authService.LoginAsync(input);
        return result;
    }
}