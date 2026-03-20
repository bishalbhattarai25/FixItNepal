using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Customs;
using FixItNepal.Domain.Shared.Addresses;
using FixItNepal.Domain.Shared.ServiceRequests;
using NetTopologySuite.Geometries;

namespace FixItNepal.Domain.ServiceRequests;

public class ServiceRequest:BaseEntity
{
    public ProblemType ProblemType { get; set; }
    public RequestType RequestType { get; set; }
    
    public DateTime? ScheduledDate { get; set; }
    
    [StringLength(ServiceRequestConst.MaxProblemDescriptionLength)]
    public string? ProblemDescription { get; set; } = null;
    
    public Guid ServiceProviderId { get; set; }
    
    public required Address Address { get; set; } = null!;

    public ServiceRequestStatus Status { get; set; } = ServiceRequestStatus.Pending;
    
    public DateTime CreationTime { get; set; } =  DateTime.UtcNow;
    
    [Timestamp]
    public byte[] RowVersion { get; set; }
}