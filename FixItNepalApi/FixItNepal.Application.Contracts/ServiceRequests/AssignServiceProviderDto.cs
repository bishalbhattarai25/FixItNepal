using FixItNepal.Domain.Shared.ServiceRequests;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public class AssignServiceProviderDto
{
    public Guid ServiceProviderId { get; set; }
    public ServiceProviderType ServiceProviderType { get; set; }
}