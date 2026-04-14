using FixItNepal.Application.Contracts.LiveStatus;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public interface IRequestClient
{
    Task RequestStatusChange(LiveRequestStatusDto requestDetails); 
    Task ServiceProdviderLocationUpdated(LiveServiceProviderUpdateDto dto);
}