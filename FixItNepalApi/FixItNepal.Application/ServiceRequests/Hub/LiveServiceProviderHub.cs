using FixItNepal.Application.Contracts.ServiceRequests;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace FixItNepal.Application.ServiceRequests.Hub;

public class LiveServiceProviderHub(
    ILogger<LiveServiceProviderHub> logger
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
}