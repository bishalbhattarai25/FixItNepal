namespace FixItNepal.Domain.OpeningHours;

public static class GenerateSlot
{
    public static List<TimeSpan> GenerateSlots(TimeSpan startTime, TimeSpan endTime, int intervalMinutes)
    {
        var slots = new List<TimeSpan>();

        var current = startTime;

        while (current + TimeSpan.FromMinutes(intervalMinutes) <= endTime)
        {
            slots.Add(current);
            current = current.Add(TimeSpan.FromMinutes(intervalMinutes));
        }

        return slots;
    } 
}