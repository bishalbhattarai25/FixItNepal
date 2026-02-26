using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.Shared.Vehicles;

namespace FixItNepal.Application.Contracts.Vehicles;

public class CreateVehicleDto
{
    [Required]
    public Guid CustomerId { get; set; }
    
    [Required]
    public VehicleType VehicleType { get; set; }

    [Required]
    [StringLength(VehicleConst.MaxVehicleModelLength)]
    public string VehicleModel { get; set; } = null!;

    [Required]
    [StringLength(VehicleConst.BrandLength)]
    public string Brand { get; set; } = null!;
    
    [Required]
    [StringLength(VehicleConst.VehicleRegistrationLength)]
    public string VehicleRegistrationNumber { get; set; } = null!;
    
    [Required]
    public FuelType FuelType { get; set; }
}