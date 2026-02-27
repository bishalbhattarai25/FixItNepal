using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Customs;
using FixItNepal.Domain.Shared.Vehicles;

namespace FixItNepal.Domain.Vehicles;

public class Vehicle : BaseEntity
{
    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
    public VehicleType VehicleType { get; set; }

    [StringLength(VehicleConst.MaxVehicleModelLength)]
    public string VehicleModel { get; set; } = null!;

    [StringLength(VehicleConst.BrandLength)]
    public string Brand { get; set; } = null!;
    
    [StringLength(VehicleConst.VehicleRegistrationLength)]
    public string VehicleRegistrationNumber { get; set; } = null!;
    
    public FuelType FuelType { get; set; }
    
    public DateTime CreationTime { get; private set; } = DateTime.UtcNow;
 
}