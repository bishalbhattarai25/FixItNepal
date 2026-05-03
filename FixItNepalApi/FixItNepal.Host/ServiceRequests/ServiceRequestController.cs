using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.LiveStatus;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Customs.PagedResult;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.ServiceRequests;

[ApiController]
[Route("api/[controller]")]
public class ServiceRequestController(
    IServiceRequestService serviceRequestService
    )
    :ControllerBase
{
    [HttpGet]
    public async Task<PagedResultDto<RequestDto>> GetListAsync(RequestPagedListDto input)
    {
        var pagedList = await serviceRequestService.GetListAsync(input);
        return pagedList;
    }
    
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

    [HttpGet("{id:guid}/nearby-service-provider")]
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

    [HttpPost("/nearby-services")]
    public async Task<NearbyServiceProviderDto> GetNearbyServicesAsync(LocationCoordinationDto input, double radiusInKm)
    {
        var nearbyServiceProvider = await serviceRequestService.GetNearbyServicesAsync(input, radiusInKm);
        return nearbyServiceProvider;
    }
    
}