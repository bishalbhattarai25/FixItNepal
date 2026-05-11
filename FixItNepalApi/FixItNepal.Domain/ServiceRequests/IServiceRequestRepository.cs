using FixItNepal.Domain.Customs.PagedResult;
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

    Task<PagedDbResult<ServiceRequest>> GetRequestHistory(
        Guid id,
        DateTime? date,
        ServiceRequestStatus? status,
        RequestType? requestType,
        int skipCount,
        int maxResultCount);


}