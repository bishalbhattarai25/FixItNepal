using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared.ServiceRequests;

namespace FixItNepal.Application.ServiceRequests;

public class ServiceRequestAppService(
    IMapper mapper,
    IRepository<ServiceRequest> serviceRequestRepository,
    IUnitOfWork unitOfWork
    ):IServiceRequestService
{
    public async Task<RequestDto> CreateRequestAsync(CreateRequestDto input)
    {
        var address = mapper.Map<CreateAddressDto, Address>(input.Address);
        var serviceRequest = new ServiceRequest()
        {
            ProblemType = input.ProblemType,
            RequestType = input.RequestType,
            ProblemDescription = input.ProblemDescription,
            ScheduledDate = input.ScheduledDate,
            Address = address,
        };

        if (input.RequestType == RequestType.Scheduled && input.ScheduledDate == null)
        {
            throw new BusinessException("ScheduledDateRequired", "Scheduled date cannot be null.");
        }
        
        await serviceRequestRepository.InsertAsync(serviceRequest); 
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
        
        return mapper.Map<ServiceRequest, RequestDto>(serviceRequest);
    }

    public async Task<RequestDto> AcceptRequestAsync(Guid id, Guid serviceProviderId)
    {
        var request =  await serviceRequestRepository.GetAsync(id);
        if (request.Status != ServiceRequestStatus.Pending)
        {
            throw new BusinessException("RequestStatusNotPending", "Request status should be pending.");
        }
        
        request.Status = ServiceRequestStatus.Accepted;
        request.ServiceProviderId = serviceProviderId;

        serviceRequestRepository.Update(request);
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
        return mapper.Map<ServiceRequest, RequestDto>(request);
    }


}