using FixItNepal.Application.Contracts.ServiceRequests;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace FixItNepal.Application.ServiceRequests.Hub;

public class LiveRequestHub(
    ILogger<LiveRequestHub> logger
    )
    :Hub<IRequestClient>
{
    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        
        if (httpContext == null)
        {
            logger.LogWarning("HttpContext is missing. Disconnecting...");
            Context.Abort();
            return;
        }
        
        var requestIdString = httpContext?.Request.Query["requestId"];
        
        if (!Guid.TryParse(requestIdString, out var requestId))
        {
            logger.LogWarning("Request ID is missing in the route. Disconnecting...");
            Context.Abort();
            return;
        }
        
        await Groups.AddToGroupAsync(Context.ConnectionId, requestId.ToString());

        await base.OnConnectedAsync();
    }
}