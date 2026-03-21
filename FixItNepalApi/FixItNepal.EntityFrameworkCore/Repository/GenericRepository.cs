using System.Linq.Expressions;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Repository;
using FixItNepal.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.EntityFrameworkCore.Repository;

public class GenericRepository<T> (
    ApiDbContext dbContext
    ): IRepository<T> where T : class
{
    protected readonly DbSet<T> _dbSet = dbContext.Set<T>();
    
    public async Task<T> GetAsync(Guid id)
    {
        var entity = await _dbSet.FindAsync(id);

        if (entity == null)
        {
            var entityName = typeof(T).Name;
            throw new BusinessException(
                $"{entityName}:NotFound",
                $"'{entityName}' was not found."
            );
        }
        return entity;
    }

    public async Task<IEnumerable<T>> GetListAsync( Expression<Func<T, bool>>? filter = null)
    {
        if (filter != null)
        {
            return await _dbSet.Where(filter).ToListAsync();
        }

        return await _dbSet.ToListAsync();
    }

    public async Task<T> InsertAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        return entity;
    }

    public void Update(T entity)
    {
         _dbSet.Update(entity);
    }

    public Task RemoveAsync(T entity)
    {
        _dbSet.Remove(entity);
        return Task.CompletedTask;
    }
    
    public async Task<(int TotalCount, ICollection<T> Items)> GetPagedListAsync(
        int skipCount = 0,
        int maxResultCount = 10,
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null)
    {
        IQueryable<T> query = _dbSet.AsNoTracking();

        if (filter != null)
        {
            query = query.Where(filter);
        }

        if (orderBy != null)
        {
            query = orderBy(query);
        }
        
        int totalCount = await query.CountAsync();

        var items = await query
            .Skip(skipCount)
            .Take(maxResultCount)
            .ToListAsync();

        return (totalCount, items);
    }
}