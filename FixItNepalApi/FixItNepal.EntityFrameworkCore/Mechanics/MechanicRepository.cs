using FixItNepal.Domain.Customs.Helper;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.EntityFrameworkCore.EntityFrameworkCore;
using FixItNepal.EntityFrameworkCore.Repository;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace FixItNepal.EntityFrameworkCore.Mechanics;

public class MechanicRepository:GenericRepository<Mechanic>,IMechanicRepository
{
    public MechanicRepository(ApiDbContext context) : base(context)
    {
        
    }


    public async Task<ICollection<Mechanic>> GetNearbyMechanicsAsync(Point userLocation, double radiusInMeters)
    {
        var mechanicsWithCoordinates = await _dbSet
            .Include(m => m.Address)
            .Where(m => m.Address.LocationCoordinatePoint != null)
            .ToListAsync(); 

        // Calculate distance using Haversine helper
        var nearbyMechanics = mechanicsWithCoordinates
            .Select(m => new
            {
                Mechanic = m,
                Distance = GeoDistanceHelper.GetDistanceInMeters(userLocation, m.Address.LocationCoordinatePoint!)
            })
            .Where(x => x.Distance <= radiusInMeters) 
            .OrderBy(x => x.Distance)               
            .Select(x => x.Mechanic)
            .ToList();
        
        return nearbyMechanics;
    }
    
    
}