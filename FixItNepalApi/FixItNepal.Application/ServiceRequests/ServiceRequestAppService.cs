using System.Linq.Expressions;
using AutoMapper;
using FixItNepal.Application.BackgroundJobs;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Application.Contracts.LiveStatus;
using FixItNepal.Application.Contracts.Mechanics;
using FixItNepal.Application.Contracts.OpeningHours;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.OpeningHours;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared.LiveStatus;
using FixItNepal.Domain.Shared.ServiceRequests;
using FixItNepal.Domain.Shared.Vehicles;
using Hangfire;
using LinqKit;

namespace FixItNepal.Application.ServiceRequests;

public class ServiceRequestAppService(
    IMapper mapper,
    IRepository<ServiceRequest> serviceRequestRepository,
    IUnitOfWork unitOfWork,
    IMechanicRepository mechanicRepository,
    IGarageRepository garageRepository,
    IRequestNotifier requestNotifier,
    IServiceProviderNotifier serviceProviderNotifier,
    IRepository<OpeningHour> openingHourRepository
    ):IServiceRequestService
{
    public async Task<PagedResultDto<RequestDto>> GetListAsync(RequestPagedListDto input)
    {
        Expression<Func<ServiceRequest, bool>> filter = x => true;
        
        if (input.Status.HasValue)
        {
            filter = filter.And(x => x.Status == input.Status.Value);
        }

        if (input.RequestType.HasValue)
        {
            filter = filter.And(x => x.RequestType == input.RequestType.Value);
        }
        
        if (input.CustomerId.HasValue)
        {
            filter = filter.And(x => x.CustomerId == input.CustomerId.Value);
        }
        
        if (input.ServiceProviderId.HasValue)
        {
            filter = filter.And(x => x.ServiceProviderId == input.ServiceProviderId.Value);
        }
        
        var skipCount = input.SkipCount ?? 0;
        var maxCount = input.MaxCount ?? 10;
        
        var requests = await serviceRequestRepository.GetPagedListAsync(skipCount, maxCount, filter);
        var requestDtos = mapper.Map<ICollection<ServiceRequest>, ICollection<RequestDto>>(requests.Items);
        return new PagedResultDto<RequestDto>
        {
            TotalCount = requests.TotalCount,
            Items = requestDtos
        };
    }
    
    public async Task<RequestDto> GetAsync(Guid id)
    {
        var serviceRequest = await serviceRequestRepository.GetAsync(id);
        return mapper.Map<ServiceRequest, RequestDto>(serviceRequest);
    }
    
    public async Task<RequestDto> CreateRequestAsync(CreateRequestDto input)
    {
        var serviceRequest = new ServiceRequest()
        {
            CustomerId = input.CustomerId,
            ProblemType = input.ProblemType,
            RequestType = input.RequestType,
            ProblemDescription = input.ProblemDescription,
            Latitude = input.LocationCoordinates.Latitude,
            Longitude = input.LocationCoordinates.Longitude,
            CreationTime = DateTime.UtcNow,
            Radius = input.RadiusInKm
        };

        if (input.RequestType == RequestType.Scheduled && input.ScheduledDate == null)
        {
            throw new BusinessException("ScheduledDateRequired", "Scheduled date cannot be null.");
        }

        if (input.RequestType == RequestType.Scheduled)
        {
            serviceRequest.ScheduledDate = input.ScheduledDate.HasValue 
                ? DateTime.SpecifyKind(input.ScheduledDate.Value, DateTimeKind.Utc) 
                : null;
            serviceRequest.VehicleType = input.VehicleType;
            serviceRequest.VehicleModel = input.VehicleModel;
            serviceRequest.EstimatedBudget = input.EstimatedBudget;
            serviceRequest.ScheduledTime = input.ScheduledTime;
        }
        
        await serviceRequestRepository.InsertAsync(serviceRequest); 
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
        
        var request =  mapper.Map<ServiceRequest, RequestDto>(serviceRequest);

        return request;
    }
    
    public async Task<RequestDto> AssignRequestAsync(Guid id, AssignServiceProviderDto input)
    {
        var request =  await serviceRequestRepository.GetAsync(id);
        if (request.Status != ServiceRequestStatus.Pending &&  request.Status != ServiceRequestStatus.Rejected )
        {
            throw new BusinessException("RequestAlreadyProcessed", "Request already handled");
        }
        
        request.Status = ServiceRequestStatus.Assigned;
        request.ServiceProviderId = input.ServiceProviderId;
        request.ServiceProviderType = input.ServiceProviderType;

        serviceRequestRepository.Update(request);
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
        
        await serviceProviderNotifier.NotifyChangeInRequestAsync(request, LiveUpdateType.RequestAssigned);

        BackgroundJob.Schedule<RequestAssignedToPending>(
            job => job.Execute(id),
            TimeSpan.FromMinutes(3));
                
        return mapper.Map<ServiceRequest, RequestDto>(request);
    }
    
    public async Task<RequestDto> UpdateRequestAsync(Guid id, UpdateRequestStatusDto input)
    {
        
        var request =  await serviceRequestRepository.GetAsync(id);
        if (request.ServiceProviderId != input.ServiceProviderId)
        {
            throw new BusinessException("UnAuthorized", "This is not your request");
        }
        
        request.Status = input.Status;
        
        serviceRequestRepository.Update(request);
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
        
        //updating
        await requestNotifier.NotifyChangeInRequestAsync(request, LiveUpdateType.RequestStatusUpdated);
        await serviceProviderNotifier.NotifyChangeInRequestAsync(request, LiveUpdateType.RequestStatusUpdated);

        return mapper.Map<ServiceRequest, RequestDto>(request);
        
    }
    public async Task<NearbyServiceProviderDto> GetNearbyServicesAsync(LocationCoordinationDto input, double radiusInKm)
    {
        
        var userLocation = new LocationCoordinate(input.Latitude, input.Longitude);
        var radiusInMeters = radiusInKm * 1000;
        
        var garages = await garageRepository.GetNearbyGaragesAsync(userLocation, radiusInMeters );
        var mechanics = await mechanicRepository.GetNearbyMechanicsAsync(userLocation, radiusInMeters);
        
        var nearbyGarages = mapper.Map<ICollection<Garage>, ICollection<GarageDto>>(garages);
        var nearbyMechanics = mapper.Map<ICollection<Mechanic>, ICollection<MechanicDto>>(mechanics);
        
        var nearbyServicesDto = new NearbyServiceProviderDto()
        {
            NearbyGarages = nearbyGarages,
            NearbyMechanics =  nearbyMechanics
            
        };
        return nearbyServicesDto;
    }
    
    public async Task<NearbyServiceProviderDto> GetNearbyServiceProviderAsync(Guid id )
    {
        var request = await serviceRequestRepository.GetAsync(id);
        var radiusinKm = request.Radius;
        
        var userLocation = new LocationCoordinate(request.Latitude, request.Longitude);
        var radiusInMeters = radiusinKm * 1000;
        
        var garages = await garageRepository.GetNearbyGaragesAsync(userLocation, radiusInMeters );
        var mechanics = await mechanicRepository.GetNearbyMechanicsAsync(userLocation, radiusInMeters);
        
        var nearbyGarages = mapper.Map<ICollection<Garage>, ICollection<GarageDto>>(garages);
        var nearbyMechanics = mapper.Map<ICollection<Mechanic>, ICollection<MechanicDto>>(mechanics);
        
        var nearbyServicesDto = new NearbyServiceProviderDto()
        {
            NearbyGarages = nearbyGarages,
            NearbyMechanics =  nearbyMechanics
            
        };
        return nearbyServicesDto;
    }

    public async Task<LiveServiceProviderUpdateDto> GetLatestServiceProviderLocationAsync(Guid id)
    {
        var request = await serviceRequestRepository.GetAsync(id);
        var lastLocationDto = new LiveServiceProviderUpdateDto()
        {
            RequestId = id,
            ServiceProviderId = request.ServiceProviderId,
            Longitude = request.Longitude,
            Latitude = request.LastKnownLatitude,
            Timestamp = DateTimeOffset.UtcNow   
        };
        return lastLocationDto;
    }
    public async Task<ICollection<AvailableSlotDto>> GetAvailableSlotAsync(Guid serviceProviderId, DateTime date)
    {
        var dayOfWeek = date.DayOfWeek;
        var dateOnly = DateOnly.FromDateTime(date);

        var availability = await openingHourRepository.GetAsync(x =>
            x.ServiceProviderId == serviceProviderId &&
            x.DayOfWeek == dayOfWeek);

        var slots = GenerateSlot.GenerateSlots(
            availability.StartTime,
            availability.EndTime,
            60);

        var result = new List<AvailableSlotDto>();

        foreach (var slot in slots)
        {
            var bookingCount = await serviceRequestRepository.CountAsync(x =>
                x.ServiceProviderId == serviceProviderId &&
                x.RequestType == RequestType.Scheduled &&
                x.ScheduledDate == date.Date &&
                x.ScheduledTime == slot);

            result.Add(new AvailableSlotDto
            {
                Time = slot,
                IsAvailable = bookingCount < availability.MaxAppointmentsPerSlot
            });
        }

        return result;
    }
    
}