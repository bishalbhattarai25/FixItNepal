using AutoMapper;
using FixItNepal.Application.Contracts.AppUsers;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Shared;

namespace FixItNepal.Application.AppUsers;

public class AppUserAppService(
        IRepository<AppUser> appUserRepository,
        IRepository<Customer>  customerRepository,
        IRepository<Garage>   garageRepository,
        IRepository<Mechanic>   mechanicRepository,
        IMapper mapper
        ):
   IAppUserService
{
    public async Task<BaseAppUserDto> GetUserProfileAsync(Guid userId, string role)
    {
        return role switch
        {
            ApiConst.AppCustomerRoleName => await GetCustomerDto(userId),
            ApiConst.AppGarageRoleName  => await GetGarageDto(userId),
            ApiConst.AppSuperAdminRoleName => await GetAdminDto(userId),
            ApiConst.AppMechanicRoleName    => await GetMechanicDto(userId),
            _ => throw new BusinessException("UnspecifiedRole", "Unknown role ")
        };
    }

    private async Task<CustomerAppUserDto> GetCustomerDto(Guid userId)
    {
        var customer = await customerRepository.GetAsync(userId);
        return mapper.Map<Customer, CustomerAppUserDto>(customer);
    }

    private async Task<GarageAppUserDto> GetGarageDto(Guid userId)
    {
        var garage = await garageRepository.GetAsync(userId);
        return mapper.Map<Garage, GarageAppUserDto>(garage);
    }

    private async Task<SuperAdminAppUserDto> GetAdminDto(Guid userId)
    {
        var admin = await appUserRepository.GetAsync(userId);
        return mapper.Map<AppUser, SuperAdminAppUserDto>(admin);
    }

    private async Task<MechanicAppUserDto> GetMechanicDto(Guid userId)
    {
        var mechanic = await mechanicRepository.GetAsync(userId);
        return mapper.Map<Mechanic, MechanicAppUserDto>(mechanic);
    }
}