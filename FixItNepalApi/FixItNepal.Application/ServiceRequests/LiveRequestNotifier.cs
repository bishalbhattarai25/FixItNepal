using FixItNepal.Application.Contracts.LiveStatus;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Application.ServiceRequests.Hub;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared.LiveStatus;
using Microsoft.AspNetCore.SignalR;

namespace FixItNepal.Application.ServiceRequests;

public class LiveRequestNotifier(
    IHubContext<LiveRequestHub, IRequestClient> hubContext
    ):IRequestNotifier
{
    public async Task NotifyChangeInRequestAsync(ServiceRequest request, LiveUpdateType liveUpdateType)
    {
        await hubContext.Clients
            .Group(request.Id.ToString())
            .RequestStatusChange( new LiveRequestStatusDto()
                {
                    RequestId = request.Id,
                    RequestStatus = request.Status,
                    LiveUpdateType = liveUpdateType
                }
            );
    }
}