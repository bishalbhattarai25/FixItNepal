namespace FixItNepal.Application.Contracts.AppUsers;

public interface IAppUserService
{
    Task<BaseAppUserDto> GetUserProfileAsync(Guid userId, string role);
}