namespace FixItNepal.Application.Contracts.Garages;

public class AppointmentAnalyticsDto
{
    public uint Today { get; set; }
    public uint Upcoming { get; set; }
    public uint Completed { get; set; }
    public uint Total { get; set; }
    
}