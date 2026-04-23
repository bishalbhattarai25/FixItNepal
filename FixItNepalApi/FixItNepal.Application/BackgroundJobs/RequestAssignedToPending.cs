using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared.LiveStatus;
using FixItNepal.Domain.Shared.ServiceRequests;

namespace FixItNepal.Application.BackgroundJobs;

public class RequestAssignedToPending(
    IServiceRequestRepository serviceRequestRepository,
    IServiceProviderNotifier serviceProviderNotifier,
    IUnitOfWork unitOfWork
    )
{
    public async Task Execute(Guid requestId)
    {
        var request = await serviceRequestRepository.GetAsync(requestId);

        // Only revert if still assigned
        if (request.Status == ServiceRequestStatus.Assigned)
        {
            request.Status = ServiceRequestStatus.Pending;
            request.ServiceProviderId = null;
            serviceRequestRepository.Update(request);
            
            await unitOfWork.SaveChangesAsync(CancellationToken.None);

            await serviceProviderNotifier.NotifyChangeInRequestAsync(
                request,
                LiveUpdateType.RequestStatusUpdated
            );
        }
    }
}