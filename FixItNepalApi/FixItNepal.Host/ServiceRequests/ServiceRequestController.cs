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
    
    [HttpGet("{id:guid}")]
    public async Task<RequestDto> GetAsync(Guid id)
    {
        var serviceRequest = await serviceRequestService.GetAsync(id);
        return serviceRequest;
    }
    
    [HttpPost]
    public async Task<RequestDto> CreateRequestAsync(CreateRequestDto input)
    {
        var serviceRequest = await  serviceRequestService.CreateRequestAsync(input);
        return serviceRequest;
    }

    [HttpPut("{id:guid}/assign")]
    public async Task<RequestDto> AssignRequestAsync(Guid id, AssignServiceProviderDto input)
    {
        var request = await  serviceRequestService.AssignRequestAsync(id, input);
        return request;
    }
    
    [HttpPut("{id:guid}/update-status")]
    public async Task<RequestDto> AcceptRequestAsync(Guid id, UpdateRequestStatusDto input)
    {
        var request = await serviceRequestService.UpdateRequestAsync(id, input);
        return request;
    }

    [HttpPost("{id:guid}/nearby-service-provider")]
    public async Task<NearbyServiceProviderDto> GetNearbyServiceProviderAsync(Guid id)
    {
        var nearbyServiceProvider = await serviceRequestService.GetNearbyServiceProviderAsync(id);
        return nearbyServiceProvider;
    }

    [HttpPut("{id:guid}/get-last-service-provider-location")]
    public async Task<LiveServiceProviderUpdateDto> GetLatestServiceProviderLocationAsync(Guid id)
    {
        var lastLocation = await  serviceRequestService.GetLatestServiceProviderLocationAsync(id);
        return lastLocation;
    }

    
}