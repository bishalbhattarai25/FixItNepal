using FixItNepal.Domain.Repository;
using NetTopologySuite.Geometries;

namespace FixItNepal.Domain.Garages;

public interface IGarageRepository:IRepository<Garage>
{
    Task<ICollection<Garage>> GetNearbyGaragesAsync(Point userLocation, double radiusInMeters);

}