using FixItNepal.Application.Contracts.Customs;
using FixItNepal.Domain.Shared.ServiceRequests;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public class RequestPagedListDto:PagedRequestDto
{
    public ServiceRequestStatus? Status { get; set; } = ServiceRequestStatus.Pending;

}