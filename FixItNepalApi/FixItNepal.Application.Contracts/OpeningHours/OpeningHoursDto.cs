namespace FixItNepal.Application.Contracts.OpeningHours;

public class OpeningHoursDto
{
    public IEnumerable<OpeningHourDto> OpeningHours { get; set; } =  new List<OpeningHourDto>();
}