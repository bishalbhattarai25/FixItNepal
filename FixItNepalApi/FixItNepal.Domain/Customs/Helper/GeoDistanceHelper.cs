


using FixItNepal.Domain.Addresses;

namespace FixItNepal.Domain.Customs.Helper;

public class GeoDistanceHelper
{
    private const double EarthRadiusMeters = 6371000; // radius of Earth in meters

    /// <summary>
    /// Calculates distance in meters between two coordinates using Haversine formula
    /// </summary>
    public static double GetDistanceInMeters(double lat1, double lng1, double lat2, double lng2)
    {
        double dLat = ToRadians(lat2 - lat1);
        double dLng = ToRadians(lng2 - lng1);

        double a = Math.Pow(Math.Sin(dLat / 2), 2) +
                   Math.Cos(ToRadians(lat1)) *
                   Math.Cos(ToRadians(lat2)) *
                   Math.Pow(Math.Sin(dLng / 2), 2);

        double c = 2 * Math.Asin(Math.Sqrt(a));

        return EarthRadiusMeters * c;
    }

    private static double ToRadians(double angle)
    {
        return angle * Math.PI / 180.0;
    }

    /// <summary>
    /// Calculates distance in meters between two NetTopologySuite Points
    /// </summary>
    public static double GetDistanceInMeters(LocationCoordinate p1, LocationCoordinate p2)
    {
        return GetDistanceInMeters(p1.Latitude, p1.Longitude, p2.Latitude, p2.Longitude); // Y=lat, X=lng
    }
}