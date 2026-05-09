namespace FixItNepal.Application.Contracts.OpeningHours;

public class AvailableSlotDto
{
    public TimeSpan Time { get; set; }
    public bool IsAvailable { get; set; }
}