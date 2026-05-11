using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Shared.ServiceRequests;

namespace FixItNepal.Domain.ServiceRequests;

public interface IServiceRequestRepository:IRepository<ServiceRequest>
{
    Task<IEnumerable<ServiceRequest>> GetTodayServiceRequestsAsync(Guid id);
    Task<IEnumerable<ServiceRequest>> GetAppointmentsAsync(
        Guid id,
        DateTime? date,
        ServiceRequestStatus? status );


}