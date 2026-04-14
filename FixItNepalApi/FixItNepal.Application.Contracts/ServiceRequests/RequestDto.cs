using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Domain.Shared.Addresses;
using FixItNepal.Domain.Shared.ServiceRequests;
using NetTopologySuite.Geometries;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public class RequestDto:BaseRequestDto
{
    public Guid Id { get; set; }
    public ServiceRequestStatus Status { get; set; } 
    public ServiceProviderType ServiceProviderType { get; set; }
    public DateTime CreationTime { get; set; }
    public Guid ServiceProviderId { get; set; } 
    public LocationCoordinationDto LocationCoordinates { get; set; } = null!;
}