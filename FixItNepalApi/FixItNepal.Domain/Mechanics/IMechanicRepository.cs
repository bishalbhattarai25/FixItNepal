using FixItNepal.Domain.Repository;
using NetTopologySuite.Geometries;

namespace FixItNepal.Domain.Mechanics;

public interface IMechanicRepository:IRepository<Mechanic>
{
    Task<ICollection<Mechanic>> GetNearbyMechanicsAsync(Point userLocation, double radiusInMeters);

}