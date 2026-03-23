namespace FixItNepal.Application.Contracts.ServiceRequests;

public interface IServiceRequestService
{
    Task<ServiceRequestDto> CreateRequestAsync(CreateRequestDto input);
    Task<RequestDto> AssignRequestAsync(Guid id, Guid serviceProviderId);
    Task<RequestDto> AcceptRequestAsync(Guid id, Guid serviceProviderId);
    Task RejectRequestAsync(Guid id, Guid serviceProviderId);

}