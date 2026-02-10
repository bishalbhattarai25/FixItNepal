namespace FixItNepal.Domain.Shared.Addresses;

public class AddressConst
{
    public const int StreetMaxLength = 100;
    public const int CityMaxLength = 50;
    public const int CountryMaxLength = 50;
    public const int PostalCodeMaxLength = 20;

    public const double MinLatitude = -90.0;
    public const double MaxLatitude = 90.0;
    public const double MinLongitude = -180.0;
    public const double MaxLongitude = 180.0;
    
    public const int GpsCoordinateSrid = 4326;
    public const string PointTypeInMySQL = "POINT SRID 4326";
}