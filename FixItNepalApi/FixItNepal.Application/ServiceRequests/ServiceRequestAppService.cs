using System.Linq.Expressions;
using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Application.Contracts.LiveStatus;
using FixItNepal.Application.Contracts.Mechanics;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared.LiveStatus;
using FixItNepal.Domain.Shared.ServiceRequests;
using NetTopologySuite.Geometries;

namespace FixItNepal.Application.ServiceRequests;

public class ServiceRequestAppService(
    IMapper mapper,
    IRepository<ServiceRequest> serviceRequestRepository,
    IUnitOfWork unitOfWork,
    IMechanicRepository mechanicRepository,
    IGarageRepository garageRepository,
    IRequestNotifier requestNotifier,
    IServiceProviderNotifier serviceProviderNotifier
    ):IServiceRequestService
{
    public async Task<PagedResultDto<RequestDto>> GetListAsync(RequestPagedListDto input)
    {
        var filter = input.Status.HasValue
            ? (Expression<Func<ServiceRequest, bool>>)(g => g.Status == input.Status.Value)
            : null;
        
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
        var locationCoordinates = mapper.Map<LocationCoordinationDto, Point>(input.LocationCoordinates);
        var serviceRequest = new ServiceRequest()
        {
            CustomerId = input.CustomerId,
            ProblemType = input.ProblemType,
            RequestType = input.RequestType,
            ProblemDescription = input.ProblemDescription,
            ScheduledDate = input.ScheduledDate,
            LocationCoordinatePoint = locationCoordinates,
        };

        if (input.RequestType == RequestType.Scheduled && input.ScheduledDate == null)
        {
            throw new BusinessException("ScheduledDateRequired", "Scheduled date cannot be null.");
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
        
        request.Status = ServiceRequestStatus.Pending;
        request.ServiceProviderId = input.ServiceProviderId;
        request.ServiceProviderType = input.ServiceProviderType;

        serviceRequestRepository.Update(request);
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
        
        await serviceProviderNotifier.NotifyChangeInRequestAsync(request, LiveUpdateType.RequestAssigned);
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

    public async Task<NearbyServiceProviderDto> GetNearbyServiceProviderAsync(Guid id )
    {
        var request = await serviceRequestRepository.GetAsync(id);
        var radiusinKm = 50;
        
        var userLocation = new Point(request.LocationCoordinatePoint.X, request.LocationCoordinatePoint.Y);
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
            Longitude = request.LastKnownLocationOfServiceProvider!.X,
            Latitude = request.LastKnownLocationOfServiceProvider.Y,
            Timestamp = DateTimeOffset.UtcNow   
        };
        return lastLocationDto;
    }
    
}