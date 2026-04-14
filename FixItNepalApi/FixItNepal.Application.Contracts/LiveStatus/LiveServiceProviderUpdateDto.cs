namespace FixItNepal.Application.Contracts.LiveStatus;

public class LiveServiceProviderUpdateDto
{
    public Guid RequestId { get; set; }
    public Guid? ServiceProviderId { get; set; }
    public double Longitude { get; set; }
    public double Latitude { get; set; }
    
    public DateTimeOffset Timestamp { get; set; }
}