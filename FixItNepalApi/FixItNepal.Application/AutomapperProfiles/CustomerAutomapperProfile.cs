using AutoMapper;
using FixItNepal.Application.Contracts.Customers;
using FixItNepal.Domain.Customers;

namespace FixItNepal.Application.AutomapperProfiles;

public class CustomerAutomapperProfile: Profile
{
    public CustomerAutomapperProfile()
    {
        CreateMap<Customer, CustomerDto>();
    }
}