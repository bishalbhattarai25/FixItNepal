using FixItNepal.Application.Contracts.ExternalSmsProviders;

namespace FixItNepal.Application.ExternalSmsProviders;

public class ExternalSmsProvider:IExternalSmsProvider
{
    public Task SendAsync(string phoneNumber, string message)
    {
        throw new NotImplementedException();
    }
}