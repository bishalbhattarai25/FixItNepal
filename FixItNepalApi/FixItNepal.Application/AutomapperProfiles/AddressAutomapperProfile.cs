
using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Domain.Addresses;

namespace FixItNepal.Application.AutomapperProfiles;

public class AddressAutomapperProfile:Profile
{
    public AddressAutomapperProfile()
    {
        CreateMap<Address, AddressDto>()
            .ForPath(dest => dest.LocationCoordinatePoint.Latitude,
                opt => opt.MapFrom(src => src.Latitude))
            .ForPath(dest => dest.LocationCoordinatePoint.Longitude,
                opt => opt.MapFrom(src => src.Longitude));

        CreateMap<CreateAddressDto, Address>();
        
    }
}