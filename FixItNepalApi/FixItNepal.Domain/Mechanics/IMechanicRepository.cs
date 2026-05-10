using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Repository;

namespace FixItNepal.Domain.Mechanics;

public interface IMechanicRepository:IRepository<Mechanic>
{
    Task<ICollection<Mechanic>> GetNearbyMechanicsAsync(LocationCoordinate userLocation, double radiusInMeters);

}