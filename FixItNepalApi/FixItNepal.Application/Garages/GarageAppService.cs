using System.Linq.Expressions;
using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Appointments;
using FixItNepal.Application.Contracts.AppUsers;
using FixItNepal.Application.Contracts.Customs;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Application.Contracts.MediaFiles;
using FixItNepal.Application.Contracts.OpeningHours;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Analytics.Garages;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.MediaFiles;
using FixItNepal.Domain.OpeningHours;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared;
using FixItNepal.Domain.Shared.AppUsers;
using FixItNepal.Domain.Shared.OpeningHours;
using FixItNepal.Domain.Shared.ServiceRequests;
using Hangfire;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FixItNepal.Application.Garages;

public class GarageAppService(
    IRepository<Garage> garageRepository,
    IMapper mapper,
    IRepository<MediaFile>  mediaFileRepository,
    IUnitOfWork unitOfWork,
    UserManager<AppUser> userManager,
    IServiceRequestRepository serviceRequestRepository
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

        var openingHours = CreateOpeningHours(OpeningHourSeedData.DefaultAvailability);
        garage.OpeningHours = openingHours;

        
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
        
        BackgroundJob.Enqueue<IAppUserEmailer>(x =>
            x.SendApprovalEmailAsync(garage.Email!, garage.Name, ApiConst.AppGarageRoleName,
                garage.ApprovalStatus.ToString())
        );
        
        return mapper.Map<Garage, GarageDto>(garage);

    }

    private HashSet<OpeningHour> CreateOpeningHours(
        ICollection<OpeningHourSeedModel> input)
    {
        return input.Select(x => new OpeningHour()
        {
            ServiceProviderType = ServiceProviderType.Garage,
            DayOfWeek =  x.DayOfWeek,
            StartTime = x.StartTime,
            EndTime = x.EndTime,
            MaxAppointmentsPerSlot = x.MaxAppointmentsPerSlot,
        }).ToHashSet();
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

        BackgroundJob.Enqueue<IAppUserEmailer>(x =>
            x.SendApprovalEmailAsync(garage.Email!, garage.Name, ApiConst.AppGarageRoleName,
                garage.ApprovalStatus.ToString())
        );
    }

    public async Task<IEnumerable<RequestDto>> GetServiceRequestOfTodayAsync(Guid id)
    {
        var todayRequest = await serviceRequestRepository.GetTodayServiceRequestsAsync(id);
        return mapper.Map<IEnumerable<ServiceRequest>, IEnumerable<RequestDto>>(todayRequest); 
    }
    
    public async Task<ICollection<AppointmentDto>> GetAppointmentsAsync(Guid id, DateTime? date, ServiceRequestStatus? status)
    {
        DateTime? newDate = null;

        if (date.HasValue)
        {
            newDate = DateTime.SpecifyKind(date.Value, DateTimeKind.Utc);
        }
        
        var appointments = await serviceRequestRepository.GetAppointmentsAsync(id, newDate, status);
        return mapper.Map<ICollection<AppointmentDto>>(appointments); 
    }
    
    public async Task<PagedResultDto<RequestDto>> GetRequestHistoryAsync(Guid id,  DateTime? date, ServiceRequestStatus? status, RequestType? type, PagedRequestDto pagedRequest)
    {
        DateTime? newDate = null;

        if (date.HasValue)
        {
            newDate = DateTime.SpecifyKind(date.Value, DateTimeKind.Utc);
        }
        
        var requests = await serviceRequestRepository.GetRequestHistory(id, newDate, status, type, pagedRequest.SkipCount ?? 0, pagedRequest.MaxCount ?? 10);
        return mapper.Map<PagedDbResult<ServiceRequest>, PagedResultDto<RequestDto>>(requests);
    }
    
    public async Task<AppointmentAnalyticsDto> GetAppointmentAnalyticsAsync(Guid id)
    {
        var analytics = await serviceRequestRepository.GetAppointmentAnalyticsAsync(id);
        return mapper.Map<AppointmentAnalytics, AppointmentAnalyticsDto>(analytics);
    }

    public async Task<OpeningHoursDto> GetOpeningHourAsync(Guid id)
    {
        var garage = await garageRepository.GetAsync(id);
        return mapper.Map<IEnumerable<OpeningHour>, OpeningHoursDto>(garage.OpeningHours);
        
    } 
    
    public async Task<OpeningHoursDto> UpdateOpeningHoursAsync(
        Guid id,
        OpeningHoursDto input)
    {
        var garage = await garageRepository.GetAsync(id);

        var dbOpeningHourIds = garage.OpeningHours
            .Select(oh => oh.Id)
            .ToHashSet();
        var updatedOpeningHours = input.OpeningHours;
        var openingHourDtos = updatedOpeningHours.ToArray();
        var updatedOpeningHourIds = openingHourDtos
            .Select(oh => oh.Id)
            .ToHashSet();
        if (!dbOpeningHourIds.SetEquals(updatedOpeningHourIds))
        {
            throw new BusinessException("Invalid:OpeningHour", "Provided are not valid one");
        }

        var updatingOpeningHours = new HashSet<OpeningHour>();

        foreach (var x in garage.OpeningHours)
        {
            var updated = openingHourDtos.First(oh => oh.Id == x.Id);
            x.DayOfWeek = updated.DayOfWeek;
            x.StartTime = updated.StartTime;
            x.EndTime = updated.EndTime;
            x.IsItClosed = updated.IsItClosed;
            x.MaxAppointmentsPerSlot = updated.MaxAppointmentsPerSlot;
            updatingOpeningHours.Add(x);
        }

        garage.OpeningHours = updatingOpeningHours;
        
         garageRepository.Update(garage);
        await unitOfWork.SaveChangesAsync(CancellationToken.None);

        return mapper.Map<IEnumerable<OpeningHour>, OpeningHoursDto>(garage.OpeningHours);
    }

    private ICollection<GarageMediaFile> CreateMediaFiles(ICollection<CreateDocumentMediaFileDto> input)
    {
        return input.Select(x => new GarageMediaFile()
        {
            MediaFileId = x.ImageId
        }).ToList();
    }
    
    
}