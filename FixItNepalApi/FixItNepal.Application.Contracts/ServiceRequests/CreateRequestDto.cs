using System.ComponentModel.DataAnnotations;
using FixItNepal.Application.Contracts.Addresses;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public class CreateRequestDto:BaseRequestDto
{
    [Required]
    public CreateAddressDto Address { get; set; } = null!;
    public double RadiusInKm { get; set; } 
}