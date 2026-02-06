using FixItNepal.Application.Contracts.Authentications;

namespace FixItNepal.Application.Authentications;

public class AuthAppService : IAuthService
{
    public Task<RegisterDto> RegisterAsync(RegisterInputDto input)
    {
        throw new NotImplementedException();
    }

    public Task<LoginDto> LoginAsync(LoginInputDto input)
    {
        throw new NotImplementedException();
    }
}