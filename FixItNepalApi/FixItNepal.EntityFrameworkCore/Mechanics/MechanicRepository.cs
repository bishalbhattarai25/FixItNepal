using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Customs.Helper;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.EntityFrameworkCore.EntityFrameworkCore;
using FixItNepal.EntityFrameworkCore.Repository;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.EntityFrameworkCore.Mechanics;

public class MechanicRepository:GenericRepository<Mechanic>,IMechanicRepository
{
    public MechanicRepository(ApiDbContext context) : base(context)
    {
        
    }


    public async Task<ICollection<Mechanic>> GetNearbyMechanicsAsync(LocationCoordinate userLocation, double radiusInMeters)
    {
        var mechanicsWithCoordinates = await _dbSet
            .Include(m => m.Address)
            .ToListAsync(); 

        // Calculate distance using Haversine helper
        var nearbyMechanics = mechanicsWithCoordinates
            .Select(m => new
            {
                Mechanic = m,
                Distance = GeoDistanceHelper.GetDistanceInMeters(userLocation.Latitude, userLocation.Longitude, m.Address.Latitude, m.Address.Longitude!)
            })
            .Where(x => x.Distance <= radiusInMeters) 
            .OrderBy(x => x.Distance)               
            .Select(x => x.Mechanic)
            .ToList();
        
        return nearbyMechanics;
    }
    
    
}