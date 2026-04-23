using FixItNepal.Application.Contracts.Customs;
using FixItNepal.Domain.Shared.ServiceRequests;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public class RequestPagedListDto:PagedRequestDto
{
    public ServiceRequestStatus? Status { get; set; } 
    public RequestType? RequestType { get; set; }
    public Guid? CustomerId { get; set; }
    public Guid? ServiceProviderId { get; set; }
}