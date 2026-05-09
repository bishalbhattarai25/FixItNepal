using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.LiveStatus;
using FixItNepal.Application.Contracts.OpeningHours;
using FixItNepal.Domain.Customs.PagedResult;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public interface IServiceRequestService
{
    Task<RequestDto> GetAsync(Guid id);
    Task<PagedResultDto<RequestDto>> GetListAsync(RequestPagedListDto input);
    Task<RequestDto> CreateRequestAsync(CreateRequestDto input);
    Task<RequestDto> AssignRequestAsync(Guid id, AssignServiceProviderDto input);
    Task<RequestDto> UpdateRequestAsync(Guid id, UpdateRequestStatusDto input);
    Task<NearbyServiceProviderDto> GetNearbyServiceProviderAsync(Guid id );
    Task<LiveServiceProviderUpdateDto> GetLatestServiceProviderLocationAsync(Guid id);
    Task<NearbyServiceProviderDto> GetNearbyServicesAsync(LocationCoordinationDto input, double radiusInKm);
    Task<ICollection<AvailableSlotDto>> GetAvailableSlotAsync(Guid serviceProviderId, DateTime date);





}