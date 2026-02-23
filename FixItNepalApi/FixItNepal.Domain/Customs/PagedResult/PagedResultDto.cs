namespace FixItNepal.Domain.Customs.PagedResult;

public class PagedResultDto<T>
{
    public int TotalCount { get; set; }
    public ICollection<T> Items { get; set; } = new List<T>();
}