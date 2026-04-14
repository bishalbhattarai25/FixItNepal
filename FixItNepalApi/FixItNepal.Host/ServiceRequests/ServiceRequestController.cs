using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.LiveStatus;
using FixItNepal.Application.Contracts.ServiceRequests;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.ServiceRequests;

[ApiController]
[Route("api/[controller]")]
public class ServiceRequestController(
    IServiceRequestService serviceRequestService
    )
    :ControllerBase
{
    [HttpPost]
    public async Task<ServiceRequestDto> CreateRequestAsync(CreateRequestDto input)
    {
        var serviceRequest = await  serviceRequestService.CreateRequestAsync(input);
        return serviceRequest;
    }

    [HttpPut("{id:guid}/assign")]
    public async Task<RequestDto> AssignRequestAsync(Guid id, Guid serviceProviderId)
    {
        var request = await  serviceRequestService.AssignRequestAsync(id, serviceProviderId);
        return request;
    }
    
    [HttpPut("{id:guid}/update-status")]
    public async Task<RequestDto> AcceptRequestAsync(Guid id, UpdateRequestStatusDto input)
    {
        var request = await serviceRequestService.UpdateRequestAsync(id, input);
        return request;
    }

    [HttpPost("get-nearby-service-providers")]
    public async Task<NearbyServiceProviderDto> GetNearbyServiceProviderAsync(LocationCoordinationDto input,
        double radiusInKm)
    {
        var nearbyServiceProvider = await serviceRequestService.GetNearbyServiceProviderAsync(input, radiusInKm);
        return nearbyServiceProvider;
    }

    [HttpPut("{id:guid}/get-last-service-provider-location")]
    public async Task<LiveServiceProviderUpdateDto> GetLatestServiceProviderLocationAsync(Guid id)
    {
        var lastLocation = await  serviceRequestService.GetLatestServiceProviderLocationAsync(id);
        return lastLocation;
    }

    
}