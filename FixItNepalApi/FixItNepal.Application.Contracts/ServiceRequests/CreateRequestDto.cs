using System.ComponentModel.DataAnnotations;
using FixItNepal.Application.Contracts.Addresses;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public class CreateRequestDto:BaseRequestDto
{
    [Required]
    public LocationCoordinationDto LocationCoordinates { get; set; } = null!;
    public double RadiusInKm { get; set; } 
}