namespace FixItNepal.Domain.Repository;

public interface IRepository<T>  where T : class
{
    Task<T?> GetAsync(Guid id);
    Task<IEnumerable<T>> GetListAsync();
    Task InsertAsync(T entity);
    public void Update(T entity);
    void Remove(T entity);
}