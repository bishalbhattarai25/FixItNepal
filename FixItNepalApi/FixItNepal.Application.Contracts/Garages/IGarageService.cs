using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Shared.AppUsers;

namespace FixItNepal.Application.Contracts.Garages;

public interface IGarageService
{
    public Task<PagedResultDto<GarageDto>> GetListAsync(GaragePagedListDto input);
    Task<GarageDto> GetAsync(Guid id);
    Task<GarageDto> CreateAsync(CreateUpdateGarageDto input);
    Task<GarageDto> UpdateAsync( Guid id, CreateUpdateGarageDto input);
    Task UpdateApprovalStatusAsync(Guid id, ApprovalStatus approvalStatus);
    Task<IEnumerable<RequestDto>> GetServiceRequestOfTodayAsync(Guid id);
    Task<ICollection<RequestDto>> GetRequestHistoryAsync(Guid id);

}