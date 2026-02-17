using FixItNepal.Application.Contracts.Customers;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.Customers;

public class CustomerController(
    ICustomerService  customerService
    ):ControllerBase
{
    
}