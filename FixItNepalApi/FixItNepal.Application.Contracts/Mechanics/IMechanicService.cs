using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Shared.AppUsers;

namespace FixItNepal.Application.Contracts.Mechanics;

public interface IMechanicService
{
    Task<PagedResultDto<MechanicDto>> GetListAsync(MechanicPagedListDto input);
    Task<MechanicDto> GetAsync(Guid id);
    Task<MechanicDto> CreateAsync(CreateUpdateMechanicsDto input);
    Task<MechanicDto> UpdateAsync(Guid id, CreateUpdateMechanicsDto input);
    Task UpdateApprovalStatusAsync(Guid id, ApprovalStatus approvalStatus);

}