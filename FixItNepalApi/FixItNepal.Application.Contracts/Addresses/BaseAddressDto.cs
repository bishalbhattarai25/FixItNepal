using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;
using FixItNepal.Domain.Shared.Addresses;

namespace FixItNepal.Application.Contracts.Addresses;

public class BaseAddressDto
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
    
    public LocationCoordinationDto? LocationCoordinatePoint { get; set; }
}