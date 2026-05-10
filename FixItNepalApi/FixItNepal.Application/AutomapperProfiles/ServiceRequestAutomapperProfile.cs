using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.ServiceRequests;

namespace FixItNepal.Application.AutomapperProfiles;

public class ServiceRequestAutomapperProfile: Profile
{
    public ServiceRequestAutomapperProfile()
    {
        CreateMap<ServiceRequest, RequestDto>()
            .ForPath(dest => dest.LocationCoordinates.Latitude,
                opt => opt.MapFrom(src => src.Latitude))
            .ForPath(dest => dest.LocationCoordinates.Longitude,
                opt => opt.MapFrom(src => src.Longitude));
        
    }
    
}