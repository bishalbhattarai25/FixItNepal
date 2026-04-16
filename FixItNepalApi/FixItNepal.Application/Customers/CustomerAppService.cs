using System.Collections;
using AutoMapper;
using FixItNepal.Application.Contracts.Customers;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.Application.Customers;

public class CustomerAppService(
    IRepository<Customer> customerRepository,
    IRepository<ServiceRequest> serviceRequestRepository,
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
        
        var phoneNumberExists = await userManager.Users.AnyAsync(x => x.PhoneNumber == input.PhoneNumber) ;
        if (phoneNumberExists)
        {
            throw new BusinessException("PhoneAlreadyExists", "Phone number already registered");
        }
        
        customer.SetPhoneNumber(input.PhoneNumber);
        customer.SetUserName(input.PhoneNumber);
        
        var result = await userManager.CreateAsync(customer, input.PassWord);
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new BusinessException("UserCreationFailed",$"Failed to create user: {errors}");
        }
        
        var roleResult = await userManager.AddToRoleAsync(customer, ApiConst.AppCustomerRoleName);

        if (!roleResult.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new BusinessException("RoleCreationFailed",$"Failed to create role: {errors}");
        }
        
        return mapper.Map<Customer, CustomerDto>(customer);
    }

    public async Task<ICollection<RequestDto>> GetRequestHistoryAsync(Guid id)
    {
        var requests = await serviceRequestRepository.GetListAsync(x => x.CustomerId == id);
        return mapper.Map<ICollection<ServiceRequest>, ICollection<RequestDto>>(requests.ToList());
    }
}