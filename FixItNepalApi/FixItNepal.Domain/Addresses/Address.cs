using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FixItNepal.Domain.Shared.Addresses;
using NetTopologySuite.Geometries;

namespace FixItNepal.Domain.Addresses;

public class Address
{
    [MaxLength(AddressConst.StreetMaxLength)]
    public string? Tole { get; set; }

    [MaxLength(AddressConst.CityMaxLength)]
    public required string City { get; set; }

    [MaxLength(AddressConst.CountryMaxLength)]
    public required string Province { get; set; }

    [MaxLength(AddressConst.CountryMaxLength)]
    public required string Country { get; set; }

    [MaxLength(AddressConst.PostalCodeMaxLength)]
    public string? PostalCode { get; set; }

    [Column(TypeName = AddressConst.PointTypeInMySQL)]
    public Point? LocationCoordinatePoint { get; set; }
}