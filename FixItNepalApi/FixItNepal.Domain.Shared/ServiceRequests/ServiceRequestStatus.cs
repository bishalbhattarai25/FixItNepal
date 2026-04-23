namespace FixItNepal.Domain.Shared.ServiceRequests;

public enum ServiceRequestStatus
{
    Pending, 
    Assigned,
    Accepted,   
    Rejected,
    InProgress,    
    Completed,
    Cancelled
}