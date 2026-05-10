using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Repository;

namespace FixItNepal.Domain.Garages;

public interface IGarageRepository:IRepository<Garage>
{
    Task<ICollection<Garage>> GetNearbyGaragesAsync(LocationCoordinate userLocation, double radiusInMeters);

}