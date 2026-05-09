using AutoMapper;
using FixItNepal.Application.Contracts.LiveStatus;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.ServiceRequests;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace FixItNepal.Application.ServiceRequests.Hub;

public class LiveServiceProviderHub(
    ILogger<LiveServiceProviderHub> logger,
    IRepository<ServiceRequest> serviceRequestRepository,
    IMapper mapper,
    IUnitOfWork unitOfWork,
    IHubContext<LiveRequestHub, IRequestClient> requestHub 
    )
    :Hub<IServiceProviderClient>
{
    public override async Task OnConnectedAsync()
    {
        logger.LogInformation("LiveServiceProviderHub connected");

        var httpContext = Context.GetHttpContext();
        if (httpContext == null)
        {
            logger.LogWarning("HttpContext is missing");
        }

        var serviceProviderIdString = httpContext?.Request.Query["serviceProviderId"];
        if (!Guid.TryParse(serviceProviderIdString, out var serviceProviderId))
        {
            logger.LogWarning("Service provider ID is missing in the route. Disconnecting...");
            Context.Abort();
            return;
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, serviceProviderId.ToString());
        await base.OnConnectedAsync();
    }

    public async Task UpdateLocation(LiveServiceProviderUpdateDto dto)
        {
            var request = await serviceRequestRepository.GetAsync(x => x.Id == dto.RequestId && x.ServiceProviderId == dto.ServiceProviderId);
            
        
            request.LastKnownLatitude = dto.Latitude;
            request.LastKnownLongitude = dto.Longitude;

             serviceRequestRepository.Update(request);
             await unitOfWork.SaveChangesAsync(CancellationToken.None);
                
            dto.Timestamp = DateTimeOffset.Now;
            
            await requestHub.Clients
                .Group(dto.RequestId.ToString())
                .ServiceProviderLocationUpdated(dto);
            
            await Clients
                .Group(dto.ServiceProviderId.ToString())
                .ServiceProviderLocationUpdated(dto);
        }
    
}