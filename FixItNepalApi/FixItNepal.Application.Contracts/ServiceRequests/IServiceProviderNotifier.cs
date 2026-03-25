using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared.LiveStatus;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public interface IServiceProviderNotifier
{
    Task NotifyChangeInRequestAsync(ServiceRequest request, LiveUpdateType liveUpdateType);
}