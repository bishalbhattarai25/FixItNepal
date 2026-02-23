using System.Linq.Expressions;
using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.Shared;
using FixItNepal.Domain.Shared.AppUsers;
using Microsoft.AspNetCore.Identity;

namespace FixItNepal.Application.Garages;

public class GarageAppService(
    IRepository<Garage> garageRepository,
    IMapper mapper,
    IUnitOfWork unitOfWork,
    UserManager<AppUser> userManager
    ) : IGarageService
{
    public async Task<PagedResultDto<GarageDto>> GetListAsync(GaragePagedListDto input)
    {
        var filter = input.ApprovalStatus.HasValue
            ? (Expression<Func<Garage, bool>>)(g => g.ApprovalStatus == input.ApprovalStatus.Value)
            : null;
        var skipCount = input.SkipCount ?? 0;
        var maxCount = input.MaxCount ?? 10;
        
        var garages = await garageRepository.GetPagedListAsync(skipCount, maxCount, filter);
        var garageDtos = mapper.Map<ICollection<Garage>, ICollection<GarageDto>>(garages.Items);
        return new PagedResultDto<GarageDto>
        {
            TotalCount = garages.TotalCount,
            Items = garageDtos
        };
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
    
    public async Task UpdateApprovalStatusAsync(Guid id, ApprovalStatus approvalStatus)
    {
        var garage = await garageRepository.GetAsync(id);
        garage.ApprovalStatus = approvalStatus;
    }
}