namespace FixItNepal.Application.Contracts.ServiceRequests;

public interface IServiceRequestService
{
    Task<RequestDto> CreateRequestAsync(CreateRequestDto input);
    Task<RequestDto> AcceptRequestAsync(Guid id, Guid serviceProviderId);
}