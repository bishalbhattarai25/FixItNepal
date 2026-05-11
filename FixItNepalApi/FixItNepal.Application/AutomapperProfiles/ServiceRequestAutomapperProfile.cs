using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Appointments;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Analytics.Garages;
using FixItNepal.Domain.Customs.PagedResult;
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
        
        CreateMap<ServiceRequest, AppointmentDto>()
            .ForMember(dest => dest.Request, opt => opt.MapFrom(src => src))
            .ForMember(dest => dest.Customer, opt => opt.MapFrom(src => src.Customer));
        
        
        //analytics 

        CreateMap<AppointmentAnalytics, AppointmentAnalyticsDto>();
        
        CreateMap(typeof(PagedDbResult<>), typeof(PagedResultDto<>));
    }
    
}