namespace FixItNepal.Domain.Customs.PagedResult;

public class PagedDbResult<T> where T : class
{
    public long TotalCount { get; set; }
    public IReadOnlyList<T> Items { get; set; }

    public PagedDbResult(long totalCount, IReadOnlyList<T> items)
    {
        TotalCount = totalCount;
        Items = items;
    }
}