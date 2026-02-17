using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Mechanics;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.Shared;
using Microsoft.AspNetCore.Identity;

namespace FixItNepal.Application.Mechanics;

public class MechanicAppService (
    IRepository<Mechanic> mechanicRepository,
    IUnitOfWork unitOfWork,
    UserManager<AppUser>  userManager,
    IMapper mapper
        ): IMechanicService
{
    public async Task<ICollection<MechanicDto>> GetListAsync()
    {
        var mechanics = await mechanicRepository.GetListAsync();
        return mapper.Map<ICollection<Mechanic>, ICollection<MechanicDto>>(mechanics.ToList());
    }

    public async Task<MechanicDto> GetAsync(Guid id)
    {
        var mechanic = await mechanicRepository.GetAsync(id);
        return mapper.Map<Mechanic, MechanicDto>(mechanic);
    }

    public async Task<MechanicDto> CreateAsync(CreateUpdateMechanicsDto input)
    {
                
        var address = mapper.Map<CreateAddressDto, Address>(input.Address);
        var mechanic = new Mechanic()
        {
            Name = input.Name,
            Address = address
        };
        mechanic.SetEmailAddress(input.EmailAddress);
        mechanic.SetPhoneNumber(input.PhoneNumber);
        mechanic.SetUserName(input.PhoneNumber);
        
        var result = await userManager.CreateAsync(mechanic, input.PassWord);
        
        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Failed to create user: {errors}");
        }

        var roleResult = await userManager.AddToRoleAsync(mechanic, ApiConst.AppMechanicRoleName);
        if (!roleResult.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Failed to create role: {errors}");
        }
        
        return mapper.Map<Mechanic, MechanicDto>(mechanic);
    }

    public Task<MechanicDto> UpdateAsync(Guid id, CreateUpdateMechanicsDto input)
    {
        throw new NotImplementedException();
    }
}