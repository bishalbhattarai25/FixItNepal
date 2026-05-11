namespace FixItNepal.Application.Contracts.OpeningHours;

public class OpeningHourDto
{
    public Guid Id { get; set; }
    public DayOfWeek DayOfWeek { get; set; }

    public TimeSpan StartTime { get; set; }

    public TimeSpan EndTime { get; set; }
    public bool IsItClosed { get; set; }

    public int MaxAppointmentsPerSlot { get; set; }
}