using FixItNepal.Application.Contracts.Authentications;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.Authentications;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService)
    : ControllerBase
{
    [HttpPost]
    [Route("/login")]
    public async Task<LoginDto> LoginAsync(LoginInputDto input)
    {
        var result = await authService.LoginAsync(input);
        return result;
    }
    
    [HttpPost("/send-otp")]
    public async Task<IActionResult> SendOtpAsync(string phoneNumber)
    {
        await authService.SendOtpAsync(phoneNumber);
        return Ok("Otp sent Successfully");
    }

    [HttpPost("/verify-otp")]
    public async Task<IActionResult> VerifyOtpAsync(VerifyOtp input)
    {
        await authService.VerifyOtpAsync(input);
        return Ok("Otp verified Successfully");
    }
}