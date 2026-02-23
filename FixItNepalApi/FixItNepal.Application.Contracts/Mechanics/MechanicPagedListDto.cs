using FixItNepal.Application.Contracts.Customs;
using FixItNepal.Domain.Shared.AppUsers;

namespace FixItNepal.Application.Contracts.Mechanics;

public class MechanicPagedListDto:PagedRequestDto
{
    public ApprovalStatus? ApprovalStatus { get; set; }
}