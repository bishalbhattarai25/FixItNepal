namespace FixItNepal.Application.Contracts.ExternalSmsProviders;

public interface IExternalSmsProvider
{
    Task SendAsync(string phoneNumber, string message);
}