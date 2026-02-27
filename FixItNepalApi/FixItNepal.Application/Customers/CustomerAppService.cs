using AutoMapper;
using FixItNepal.Application.Contracts.Customers;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Shared;
using Microsoft.AspNetCore.Identity;

namespace FixItNepal.Application.Customers;

public class CustomerAppService(
    IRepository<Customer> customerRepository,
    IMapper mapper,
    UserManager<AppUser>  userManager
        ):ICustomerService
{
    public async Task<PagedResultDto<CustomerDto>> GetListAsync(CustomerPagedListDto input)
    {
        var skipCount = input.SkipCount ?? 0;
        var maxCount = input.MaxCount ?? 10;
        
        var customer = await customerRepository.GetPagedListAsync(skipCount, maxCount);
        var customerDtos = mapper.Map<ICollection<Customer>, ICollection<CustomerDto>>(customer.Items);
        return new PagedResultDto<CustomerDto>
        {
            TotalCount = customer.TotalCount,
            Items = customerDtos
        };
    }

    public async Task<CustomerDto> GetAsync(Guid id)
    {
        var customer = await customerRepository.GetAsync(id);
        return mapper.Map<Customer, CustomerDto>(customer);
    }

    public async Task<CustomerDto> CreateAsync(CreateCustomerDto input)
    {

        var customer = new Customer();
        
        customer.SetPhoneNumber(input.PhoneNumber);
        customer.SetUserName(input.PhoneNumber);
        
        var result = await userManager.CreateAsync(customer, input.PassWord);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Failed to create user: {errors}");
        }
        
        var roleResult = await userManager.AddToRoleAsync(customer, ApiConst.AppCustomerRoleName);

        if (!roleResult.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Failed to create role: {errors}");
        }
        
        return mapper.Map<Customer, CustomerDto>(customer);
    }
}