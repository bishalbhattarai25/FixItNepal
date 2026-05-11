using FixItNepal.Domain.Shared.ServiceRequests;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public class UpdateRequestStatusDto
{
    public Guid? ServiceProviderId { get; set; }
    public ServiceRequestStatus Status { get; set; }
}