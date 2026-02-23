namespace FixItNepal.Application.Contracts.Customs;

public class PagedRequestDto
{
    public int? SkipCount { get; set; }
    public int? MaxCount { get; set; }
}