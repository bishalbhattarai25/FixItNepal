using System.Threading.Tasks;

namespace FixItNepal.Application.Contracts.Authentications
{
    public interface IAuthService
    {
        Task<RegisterDto> RegisterAsync(RegisterInputDto input);
        Task<LoginDto> LoginAsync(LoginInputDto input);
    }
}