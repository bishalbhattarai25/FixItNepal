using System.Linq.Expressions;
using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Mechanics;
using FixItNepal.Application.Contracts.MediaFiles;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.MediaFiles;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared;
using FixItNepal.Domain.Shared.AppUsers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.Application.Mechanics;

public class MechanicAppService (
    IRepository<Mechanic> mechanicRepository,
    IUnitOfWork unitOfWork,
    IRepository<MediaFile> mediaFileRepository,
    UserManager<AppUser>  userManager,
    IMapper mapper,
    IServiceRequestRepository serviceRequestRepository
        ): IMechanicService
{
    public async Task<PagedResultDto<MechanicDto>> GetListAsync(MechanicPagedListDto input)
    {
          var filter = input.ApprovalStatus.HasValue
            ? (Expression<Func<Mechanic, bool>>)(g => g.ApprovalStatus == input.ApprovalStatus.Value)
            : null;
          var skipCount = input.SkipCount ?? 0;
          var maxCount = input.MaxCount ?? 10;
        
        var mechanics = await mechanicRepository.GetPagedListAsync(skipCount, maxCount, filter);
        var mechanicDtos = mapper.Map<ICollection<Mechanic>, ICollection<MechanicDto>>(mechanics.Items);
        return new PagedResultDto<MechanicDto>
        {
            TotalCount = mechanics.TotalCount,
            Items = mechanicDtos
        };
    }

    public async Task<MechanicDto> GetAsync(Guid id)
    {
        var mechanic = await mechanicRepository.GetAsync(id);
        return mapper.Map<Mechanic, MechanicDto>(mechanic);
    }

    public async Task<MechanicDto> CreateAsync(CreateUpdateMechanicsDto input)
    {
        var phoneNumberExists = await userManager.Users.AnyAsync(x => x.PhoneNumber == input.PhoneNumber) ;
        if (phoneNumberExists)
        {
            throw new BusinessException("PhoneAlreadyExists", "Phone number already registered");
        }
        
        var logo = await mediaFileRepository.GetAsync(input.LogoId);
        var address = mapper.Map<CreateAddressDto, Address>(input.Address);
        var mechanic = new Mechanic()
        {
            Name = input.Name,
            Address = address,
            LogoId =  input.LogoId
        };

        var mechanicMediaFile = CreateMediaFiles(input.DocumentMediaFiles);
        
        mechanic.MechanicMediaFiles = mechanicMediaFile;
        
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
    
    public async Task UpdateApprovalStatusAsync(Guid id, ApprovalStatus approvalStatus)
    {
        var mechanic = await mechanicRepository.GetAsync(id);
        mechanic.ApprovalStatus = approvalStatus;
        mechanicRepository.Update(mechanic);
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
    }

    public async Task<IEnumerable<RequestDto>> GetServiceRequestOfTodayAsync(Guid id)
    {
        var todayRequest = await serviceRequestRepository.GetTodayServiceRequestsAsync(id);
        return mapper.Map<IEnumerable<ServiceRequest>, IEnumerable<RequestDto>>(todayRequest); 
    }
    
    public async Task<ICollection<RequestDto>> GetRequestHistoryAsync(Guid id)
    {
        var requests = await serviceRequestRepository.GetListAsync(x => x.ServiceProviderId == id);
        return mapper.Map<ICollection<ServiceRequest>, ICollection<RequestDto>>(requests.ToList());
    }
    
    private ICollection<MechanicMediaFile> CreateMediaFiles(ICollection<CreateDocumentMediaFileDto> input)
    {
        return input.Select(x => new MechanicMediaFile()
        {
            MediaFileId = x.ImageId
        }).ToList();
    }
}