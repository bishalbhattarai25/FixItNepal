using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.LiveStatus;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public interface IServiceRequestService
{
    Task<RequestDto> GetAsync(Guid id);
    Task<RequestDto> CreateRequestAsync(CreateRequestDto input);
    Task<RequestDto> AssignRequestAsync(Guid id, AssignServiceProviderDto input);
    Task<RequestDto> UpdateRequestAsync(Guid id, UpdateRequestStatusDto input);
    Task<NearbyServiceProviderDto> GetNearbyServiceProviderAsync(Guid id );
    Task<LiveServiceProviderUpdateDto> GetLatestServiceProviderLocationAsync(Guid id);



}