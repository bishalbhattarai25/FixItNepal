using System.Collections.ObjectModel;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Application.Contracts.Mechanics;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public class NearbyServiceProviderDto
{
    public ICollection<GarageDto>  NearbyGarages { get; set; } = new Collection<GarageDto>();
    public ICollection<MechanicDto> NearbyMechanics { get; set; } = new Collection<MechanicDto>();
}