using FixItNepal.Application.Contracts.LiveStatus;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Application.ServiceRequests.Hub;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared.LiveStatus;
using Microsoft.AspNetCore.SignalR;

namespace FixItNepal.Application.ServiceRequests;

public class LiveServiceProviderNotifier(
    IHubContext<LiveServiceProviderHub, IServiceProviderClient>  hubContext
    ):IServiceProviderNotifier
{
    public async Task NotifyChangeInRequestAsync(ServiceRequest request, LiveUpdateType liveUpdateType)
    {
        await hubContext.Clients
            .Group(request.ServiceProviderId.ToString())
            .ServiceProviderRequestStatusChange(new LiveRequestStatusDto()
            {
                RequestId = request.Id,
                RequestStatus = request.Status,
                LiveUpdateType = liveUpdateType,
            });
    }
}