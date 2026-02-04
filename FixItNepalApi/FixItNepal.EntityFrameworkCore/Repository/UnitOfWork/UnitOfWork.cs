using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.EntityFrameworkCore.EntityFrameworkCore;

namespace FixItNepal.EntityFrameworkCore.Repository.UnitOfWork;

public class UnitOfWork(
    ApiDbContext dbContext
    )
    :IUnitOfWork, IAsyncDisposable
{
    public Task<int> SaveChangesAsync(CancellationToken cancellationToken)
    {
        return dbContext.SaveChangesAsync(cancellationToken);
    }

    public void Dispose()
    {
        dbContext.Dispose();
    }

    public async ValueTask DisposeAsync()
    {
        await dbContext.DisposeAsync();
    }
}