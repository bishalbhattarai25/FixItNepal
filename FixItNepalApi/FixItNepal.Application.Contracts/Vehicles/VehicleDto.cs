using FixItNepal.Domain.Shared.Vehicles;

namespace FixItNepal.Application.Contracts.Vehicles;

public class VehicleDto
{
    public Guid Id { get; set; }
    public Guid CustomerId { get; set; }
    public VehicleType VehicleType { get; set; }
    public string VehicleModel { get; set; } = null!;
    public string Brand { get; set; } = null!;
    public string VehicleRegistrationNumber { get; set; } = null!;
    public FuelType FuelType { get; set; }
    public DateTime CreationTime { get; set; }
}