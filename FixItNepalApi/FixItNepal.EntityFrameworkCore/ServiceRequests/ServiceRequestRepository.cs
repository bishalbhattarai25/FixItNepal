using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared.ServiceRequests;
using FixItNepal.EntityFrameworkCore.EntityFrameworkCore;
using FixItNepal.EntityFrameworkCore.Repository;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.EntityFrameworkCore.ServiceRequests;

public class ServiceRequestRepository(ApiDbContext dbContext) :GenericRepository<ServiceRequest>(dbContext), IServiceRequestRepository
{
    public async Task<IEnumerable<ServiceRequest>> GetTodayServiceRequestsAsync(Guid id)
    {
        var today = DateTime.Now.Date;
        return await _dbSet.Where(x => x.ServiceProviderId == id && x.CreationTime.Date == today)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<ServiceRequest>> GetAppointmentsAsync(
        Guid id,
        DateTime? date,
        ServiceRequestStatus? status)
    {
        var query = _dbSet.AsQueryable();

        if (date.HasValue)
        {
            var d = date.Value.Date;
            query = query.Where(x => x.CreationTime.Date == d);
        }

        if (status.HasValue)
        {
            query = query.Where(x => x.Status == status);
        }

        return await query.ToListAsync();
    }
}