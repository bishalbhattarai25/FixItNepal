namespace FixItNepal.Domain.Shared.OpeningHours;

public class OpeningHourSeedModel
{
    
    public DayOfWeek DayOfWeek { get; set; }

    public TimeSpan StartTime { get; set; }

    public TimeSpan EndTime { get; set; }
    public bool IsItClosed { get; set; } = false;

    public int MaxAppointmentsPerSlot { get; set; }
}