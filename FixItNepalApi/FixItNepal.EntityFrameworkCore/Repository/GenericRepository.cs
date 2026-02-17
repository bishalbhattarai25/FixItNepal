using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Repository;
using FixItNepal.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.EntityFrameworkCore.Repository;

public class GenericRepository<T> (
    ApiDbContext dbContext
    ): IRepository<T> where T : class
{
    private readonly DbSet<T> _dbSet = dbContext.Set<T>();
    
    public async Task<T> GetAsync(Guid id)
    {
        var entity = await _dbSet.FindAsync(id);
        if (entity == null)
            throw new EntityNotFoundException(typeof(T), id);

        return entity;
    }

    public async Task<IEnumerable<T>> GetListAsync()
    {
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

    public void Remove(T entity)
    {
        _dbSet.Remove(entity);
    }
}