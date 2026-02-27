using FixItNepal.Domain.Customs.PagedResult;

namespace FixItNepal.Application.Contracts.Customers;

public interface ICustomerService
{
    public Task<PagedResultDto<CustomerDto>> GetListAsync(CustomerPagedListDto input);
    Task<CustomerDto> GetAsync(Guid id);
    Task<CustomerDto> CreateAsync(CreateCustomerDto input);
    // Task<CustomerDto> UpdateAsync( Guid id,  input);
}