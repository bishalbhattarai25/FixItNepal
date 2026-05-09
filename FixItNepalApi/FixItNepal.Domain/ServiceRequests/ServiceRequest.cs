using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Customs;
using FixItNepal.Domain.Shared.Addresses;
using FixItNepal.Domain.Shared.ServiceRequests;
using FixItNepal.Domain.Shared.Vehicles;

namespace FixItNepal.Domain.ServiceRequests;

public class ServiceRequest:BaseEntity
{
    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
    
    public ProblemType ProblemType { get; set; }
    public RequestType RequestType { get; set; }
    
    public ServiceProviderType? ServiceProviderType { get; set; }
    
    public DateTime? ScheduledDate { get; set; }
    public TimeSpan? ScheduledTime { get; set; }
    
    
    [StringLength(ServiceRequestConst.MaxProblemDescriptionLength)]
    public string? ProblemDescription { get; set; } = null;
    
    public Guid? ServiceProviderId { get; set; }
    
    [Range(AddressConst.MinLatitude, AddressConst.MaxLatitude)]
    public double LastKnownLatitude { get; set; }
    
    [Range(AddressConst.MinLongitude, AddressConst.MaxLongitude)]
    public double LastKnownLongitude { get; set; }
    
    
    [Range(AddressConst.MinLatitude, AddressConst.MaxLatitude)]
    public double Latitude { get; set; }
    
    [Range(AddressConst.MinLongitude, AddressConst.MaxLongitude)]
    public double Longitude { get; set; }

    public ServiceRequestStatus Status { get; set; } = ServiceRequestStatus.Pending;
    
    public DateTime CreationTime { get; set; } =  DateTime.UtcNow;
    
    // for schduled one 
    public VehicleType? VehicleType { get; set; }
    
    [StringLength(50)]
    public string? VehicleModel { get; set; }
    public decimal? EstimatedBudget { get; set; }
    
    [Timestamp]
    public byte[] RowVersion { get; set; }
}