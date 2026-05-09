using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Customs;
using FixItNepal.Domain.Shared.Addresses;
using FixItNepal.Domain.Shared.ServiceRequests;
using FixItNepal.Domain.Shared.Vehicles;
using NetTopologySuite.Geometries;

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
    
    [Column(TypeName = AddressConst.PointTypeInMySQL)]
    public Point? LastKnownLocationOfServiceProvider { get; set; }
    
    
    [Column(TypeName = AddressConst.PointTypeInMySQL)]
    public Point? LocationCoordinatePoint { get; set; }
    
    // public required Address Address { get; set; } = null!;

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