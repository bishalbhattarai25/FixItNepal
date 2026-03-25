using FixItNepal.Domain.Shared.LiveStatus;
using FixItNepal.Domain.Shared.ServiceRequests;

namespace FixItNepal.Application.Contracts.LiveStatus;

public class LiveRequestStatusDto
{
    public Guid RequestId { get; set; }
    public ServiceRequestStatus RequestStatus { get; set; }
    public LiveUpdateType LiveUpdateType { get; set; }
}