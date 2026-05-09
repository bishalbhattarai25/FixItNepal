namespace FixItNepal.Domain.Shared.OpeningHours;

public static class OpeningHourSeedData
{
    public static readonly OpeningHourSeedModel[] DefaultAvailability =
    {
        new OpeningHourSeedModel()
        {
            DayOfWeek = DayOfWeek.Sunday,
            StartTime = new TimeSpan(9, 0,0),
            EndTime = new TimeSpan(18, 0,0),
            MaxAppointmentsPerSlot = 2
        },
        new OpeningHourSeedModel
        {
            DayOfWeek = DayOfWeek.Monday,
            StartTime = new TimeSpan(9, 0,0),
            EndTime = new TimeSpan(18, 0,0),
            MaxAppointmentsPerSlot = 2
        },
        new OpeningHourSeedModel
        {
            DayOfWeek = DayOfWeek.Tuesday,
            StartTime = new TimeSpan(9, 0,0),
            EndTime = new TimeSpan(18, 0,0),
            MaxAppointmentsPerSlot = 2
        },
        new OpeningHourSeedModel
        {
            DayOfWeek = DayOfWeek.Wednesday,
            StartTime = new TimeSpan(9, 0,0),
            EndTime = new TimeSpan(18, 0,0),
            MaxAppointmentsPerSlot = 2
        },
        new OpeningHourSeedModel
        {
            DayOfWeek = DayOfWeek.Thursday,
            StartTime = new TimeSpan(9, 0,0),
            EndTime = new TimeSpan(18, 0,0),
            MaxAppointmentsPerSlot = 2
        },
        new OpeningHourSeedModel
        {
            DayOfWeek = DayOfWeek.Friday,
            StartTime = new TimeSpan(9, 0,0),
            EndTime = new TimeSpan(18, 0,0),
            MaxAppointmentsPerSlot = 2
        },
        new OpeningHourSeedModel
        {
        DayOfWeek = DayOfWeek.Saturday,
        StartTime = new TimeSpan(9, 0,0),
        EndTime = new TimeSpan(18, 0,0),
        MaxAppointmentsPerSlot = 2,
        IsItClosed =  true
        }
    };
}