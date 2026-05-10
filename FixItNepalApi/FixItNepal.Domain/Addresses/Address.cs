using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FixItNepal.Domain.Customs;
using FixItNepal.Domain.Shared.Addresses;

namespace FixItNepal.Domain.Addresses;

public class Address:BaseEntity
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
    
    [Range(AddressConst.MinLatitude, AddressConst.MaxLatitude)]
    public double Latitude { get; set; }
    [Range(AddressConst.MinLongitude, AddressConst.MaxLongitude)]
    public double Longitude { get; set; }

}