using FixItNepal.Domain.Repository;

namespace FixItNepal.Domain.ServiceRequests;

public interface IServiceRequestRepository:IRepository<ServiceRequest>
{
    Task<IEnumerable<ServiceRequest>> GetTodayServiceRequestsAsync(Guid id);

}