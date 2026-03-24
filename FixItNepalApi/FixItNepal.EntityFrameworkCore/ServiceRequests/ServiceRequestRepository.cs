using FixItNepal.Domain.ServiceRequests;
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
}