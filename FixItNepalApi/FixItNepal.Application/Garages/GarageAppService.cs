using System.Linq.Expressions;
using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Application.Contracts.MediaFiles;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.MediaFiles;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.Shared;
using FixItNepal.Domain.Shared.AppUsers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.Application.Garages;

public class GarageAppService(
    IRepository<Garage> garageRepository,
    IMapper mapper,
    IRepository<MediaFile>  mediaFileRepository,
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
        var phoneNumberExists = await userManager.Users.AnyAsync(x => x.PhoneNumber == input.PhoneNumber) ;
        if (phoneNumberExists)
        {
            throw new BusinessException("PhoneAlreadyExists", "Phone number already registered");
        }
        
        var address = mapper.Map<CreateAddressDto, Address>(input.Address);

        var logo = await mediaFileRepository.GetAsync(input.LogoId);
        var garage = new Garage()
        {
            Name = input.Name,
            Address = address,
            LogoId =  input.LogoId,
        };
        
        //document mediafiles
        var garageMediaFiles = CreateMediaFiles(input.DocumentMediaFiles);
        garage.GarageMediaFiles = garageMediaFiles;
        
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
         garageRepository.Update(garage);
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
    }

    private ICollection<GarageMediaFile> CreateMediaFiles(ICollection<CreateDocumentMediaFileDto> input)
    {
        return input.Select(x => new GarageMediaFile()
        {
            MediaFileId = x.ImageId
        }).ToList();
    }
}