
using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Domain.Addresses;
using NetTopologySuite.Geometries;

namespace FixItNepal.Application.AutomapperProfiles;

public class AddressAutomapperProfile:Profile
{
    public AddressAutomapperProfile()
    {
        CreateMap<Address, AddressDto>()
            .ForMember(dest => dest.LocationCoordinatePoint,
                opt => opt.MapFrom(src => src.LocationCoordinatePoint));
        
        CreateMap<CreateAddressDto, Address>()
            .ForMember(dest => dest.LocationCoordinatePoint,
                opt => opt.MapFrom(src => 
                    src.LocationCoordinatePoint == null
                        ? null
                        : new Point(src.LocationCoordinatePoint.Longitude, src.LocationCoordinatePoint.Latitude)
                        {
                            SRID = 4326
                        }));

        CreateMap<Point, LocationCoordinationDto>()
            .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Y))
            .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.X));
    }
}