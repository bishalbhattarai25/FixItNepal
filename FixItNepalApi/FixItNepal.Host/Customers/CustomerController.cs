using FixItNepal.Application.Contracts.Customers;
using FixItNepal.Application.Contracts.ServiceRequests;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.Customers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController(
    ICustomerService  customerService
    ):ControllerBase
{

    [HttpGet]
    public async Task<IActionResult> GetListAsync([FromQuery] CustomerPagedListDto input)
    {
        var customers = await customerService.GetListAsync(input);
        return Ok(customers);
    }
    
    [HttpGet("{id:guid}")]
    public async Task<CustomerDto> GetAsync(Guid id)
    {
        var customer = await customerService.GetAsync(id);
        return customer;
    }
    
    [HttpPost]
    public async Task<CustomerDto> CreateAsync(CreateCustomerDto input)
    {
        var customer =  await customerService.CreateAsync(input);
        return customer;
    }
    
    [HttpGet("{id:guid}/request-history")]
    public async Task<ICollection<RequestDto>> GetRequestHistoryAsync(Guid id)
    {
        var requests = await customerService.GetRequestHistoryAsync(id);
        return requests;
    }

}