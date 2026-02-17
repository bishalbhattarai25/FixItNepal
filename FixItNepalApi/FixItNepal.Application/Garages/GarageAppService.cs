using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.Shared;
using Microsoft.AspNetCore.Identity;

namespace FixItNepal.Application.Garages;

public class GarageAppService(
    IRepository<Garage> garageRepository,
    IMapper mapper,
    IUnitOfWork unitOfWork,
    UserManager<AppUser> userManager
    ) : IGarageService
{
    public async Task<ICollection<GarageDto>> GetListAsync()
    {
        var garages = await garageRepository.GetListAsync();
        return mapper.Map<ICollection<Garage>, ICollection<GarageDto>>(garages.ToList());
    }

    public async Task<GarageDto> GetAsync(Guid id)
    {
       var garage = await garageRepository.GetAsync(id);
       return mapper.Map<Garage, GarageDto>(garage);
    }

    public async Task<GarageDto> CreateAsync(CreateUpdateGarageDto input)
    {
        var address = mapper.Map<CreateAddressDto, Address>(input.Address);
        var garage = new Garage()
        {
            Name = input.Name,
            Address = address
        };
        garage.SetEmailAddress(input.EmailAddress);
        garage.SetPhoneNumber(input.PhoneNumber);
        garage.SetUserName(input.PhoneNumber);

        
        var result = await userManager.CreateAsync(garage, input.PassWord);

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Failed to create user: {errors}");
        }

        var roleResult = await userManager.AddToRoleAsync(garage, ApiConst.AppGarageRoleName);
        if (!roleResult.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Failed to create role: {errors}");
        }
        
        return mapper.Map<Garage, GarageDto>(garage);

    }

    public Task<GarageDto> UpdateAsync(Guid id, CreateUpdateGarageDto input)
    {
        throw new NotImplementedException();
    }
}