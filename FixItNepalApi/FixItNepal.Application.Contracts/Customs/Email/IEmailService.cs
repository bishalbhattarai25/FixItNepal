namespace FixItNepal.Application.Contracts.Customs.Email;

public interface IEmailerService
{
    Task SendEmailAsync(string  email, string subject, string body);
}