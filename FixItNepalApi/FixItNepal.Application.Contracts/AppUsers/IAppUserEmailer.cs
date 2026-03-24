namespace FixItNepal.Application.Contracts.AppUsers;

public interface IAppUserEmailer
{
    Task SendApprovalEmailAsync(string email, string name, string role, string status);
}