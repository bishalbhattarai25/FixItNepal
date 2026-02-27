using System.Collections.ObjectModel;
using FixItNepal.Application.Contracts.Customs;
using FixItNepal.Domain.Shared.AppUsers;

namespace FixItNepal.Application.Contracts.Garages;

public class GaragePagedListDto:PagedRequestDto
{
    public ApprovalStatus? ApprovalStatus { get; set; }
}