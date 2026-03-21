using FixItNepal.Domain.Customs.Helper;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Repository;
using FixItNepal.EntityFrameworkCore.EntityFrameworkCore;
using FixItNepal.EntityFrameworkCore.Repository;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace FixItNepal.EntityFrameworkCore.Garages;

public class GarageRepository:GenericRepository<Garage>, IGarageRepository
{
    public GarageRepository(ApiDbContext context) : base(context)
    {
        
    }


    public async Task<ICollection<Garage>> GetNearbyGaragesAsync(Point userLocation, double radiusInMeters)
    {
        var mechanicsWithCoordinates = await _dbSet
            .Include(g => g.Address)
            .Where(g => g.Address.LocationCoordinatePoint != null)
            .ToListAsync(); 

        // Calculate distance using Haversine helper
        var nearbyGarages = mechanicsWithCoordinates
            .Select(m => new
            {
                Garage = m,
                Distance = GeoDistanceHelper.GetDistanceInMeters(userLocation, m.Address.LocationCoordinatePoint!)
            })
            .Where(x => x.Distance <= radiusInMeters) 
            .OrderBy(x => x.Distance)               
            .Select(x => x.Garage)
            .ToList();
        
        return nearbyGarages;
    }
}