using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Customs.Helper;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Repository;
using FixItNepal.EntityFrameworkCore.EntityFrameworkCore;
using FixItNepal.EntityFrameworkCore.Repository;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.EntityFrameworkCore.Garages;

public class GarageRepository:GenericRepository<Garage>, IGarageRepository
{
    public GarageRepository(ApiDbContext context) : base(context)
    {
        
    }


    public async Task<ICollection<Garage>> GetNearbyGaragesAsync(LocationCoordinate userLocation, double radiusInMeters)
    {
        var mechanicsWithCoordinates = await _dbSet
            .Include(g => g.Address)
            .ToListAsync(); 

        // Calculate distance using Haversine helper
        var nearbyGarages = mechanicsWithCoordinates
            .Select(m => new
            {
                Garage = m,
                Distance = GeoDistanceHelper.GetDistanceInMeters(userLocation.Latitude, userLocation.Longitude, m.Address.Latitude, m.Address.Longitude!)
            })
            .Where(x => x.Distance <= radiusInMeters) 
            .OrderBy(x => x.Distance)               
            .Select(x => x.Garage)
            .ToList();
        
        return nearbyGarages;
    }
}