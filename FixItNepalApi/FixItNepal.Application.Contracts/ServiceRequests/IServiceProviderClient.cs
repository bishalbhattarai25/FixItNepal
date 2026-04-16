using FixItNepal.Application.Contracts.LiveStatus;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public interface IServiceProviderClient
{
    Task ServiceProviderRequestStatusChange(LiveRequestStatusDto requestDetails);
    Task ServiceProviderLocationUpdated(LiveServiceProviderUpdateDto dto);

}