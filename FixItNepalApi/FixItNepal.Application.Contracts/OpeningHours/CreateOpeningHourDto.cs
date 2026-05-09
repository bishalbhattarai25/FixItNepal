namespace FixItNepal.Application.Contracts.OpeningHours;

public class CreateOpeningHourDto
{
    public DayOfWeek DayOfWeek { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }
    public bool IsItClosed { get; set; } = false;

    public int MaxAppointmentsPerSlot { get; set; } 
}