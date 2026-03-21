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

    [HttpPost("{id:guid}/assign")]
    public async Task<RequestDto> AcceptRequestAsync(Guid id, Guid serviceProviderId)
    {
        var request = await  serviceRequestService.AssignRequestAsync(id, serviceProviderId);
        return request;
    }
}