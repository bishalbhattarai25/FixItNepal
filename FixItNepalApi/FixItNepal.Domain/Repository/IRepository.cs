using System.Linq.Expressions;

namespace FixItNepal.Domain.Repository;

public interface IRepository<T>  where T : class
{
    Task<T> GetAsync(Guid id);
    Task<IEnumerable<T>> GetListAsync(Expression<Func<T, bool>>? filter = null);
    Task<T> InsertAsync (T entity);
    public void Update(T entity);
    void Remove(T entity);

    Task<(ICollection<T> Items, int TotalCount)> GetPagedListAsync(
        int skipCount = 0,
        int maxResultCount = 10,
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null);
}