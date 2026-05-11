using FixItNepal.Domain.Customs;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Shared.ServiceRequests;
using Microsoft.Extensions.DependencyInjection;

namespace FixItNepal.Domain.OpeningHours;

public class OpeningHour : BaseEntity
{
    public Guid ServiceProviderId { get; set; }
    public Garage Garage { get; set; } = null!;
    public ServiceProviderType ServiceProviderType { get; set; }

    public DayOfWeek DayOfWeek { get; set; }

    public TimeSpan StartTime { get; set; }

    public TimeSpan EndTime { get; set; }
    public bool IsItClosed { get; set; }

    public int MaxAppointmentsPerSlot { get; set; }
}