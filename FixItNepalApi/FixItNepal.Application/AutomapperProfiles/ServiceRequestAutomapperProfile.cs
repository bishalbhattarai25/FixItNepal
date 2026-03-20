using AutoMapper;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.ServiceRequests;
using Twilio.Http;

namespace FixItNepal.Application.AutomapperProfiles;

public class ServiceRequestAutomapperProfile: Profile
{
    public ServiceRequestAutomapperProfile()
    {
        CreateMap<ServiceRequest, RequestDto>();
    }
    
}