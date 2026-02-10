
using FixItNepal.Domain.Shared.Addresses;
using NetTopologySuite.Geometries;

namespace FixItNepal.Domain.Addresses;

public record LocationCoordinate(double Latitude, double Longitude)
{
    public Point ToPoint => new(Longitude, Latitude) { SRID = AddressConst.GpsCoordinateSrid };
}