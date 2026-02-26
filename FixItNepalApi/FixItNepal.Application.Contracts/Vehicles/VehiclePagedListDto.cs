using FixItNepal.Application.Contracts.Customs;

namespace FixItNepal.Application.Contracts.Vehicles;

public class VehiclePagedListDto:PagedRequestDto
{
    public Guid? CustomerId { get; set; }
}