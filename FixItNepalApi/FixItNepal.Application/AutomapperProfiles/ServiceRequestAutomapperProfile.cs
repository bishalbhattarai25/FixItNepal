using AutoMapper;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.ServiceRequests;

namespace FixItNepal.Application.AutomapperProfiles;

public class ServiceRequestAutomapperProfile: Profile
{
    public ServiceRequestAutomapperProfile()
    {
        CreateMap<ServiceRequest, RequestDto>();
    }
    
}