using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.ServiceRequests;
using NetTopologySuite.Geometries;

namespace FixItNepal.Application.AutomapperProfiles;

public class ServiceRequestAutomapperProfile: Profile
{
    public ServiceRequestAutomapperProfile()
    {
        CreateMap<ServiceRequest, RequestDto>()
            .ForMember(dest => dest.LocationCoordinates,
                opt => opt.MapFrom(src => src.LocationCoordinatePoint));
        
        CreateMap<Point, LocationCoordinationDto>()
            .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.Y))
            .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.X));
        
        CreateMap<LocationCoordinationDto, Point>()
            .ConstructUsing(src => 
                new Point(src.Longitude, src.Latitude) 
                {
                    SRID = 4326
                });
    }
    
}