using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Application.Contracts.LiveStatus;
using FixItNepal.Application.Contracts.Mechanics;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Customs.Exceptions;
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
    public async Task<ServiceRequestDto> GetAsync(Guid id)
    {
        var serviceRequest = await serviceRequestRepository.GetAsync(id);
        return mapper.Map<ServiceRequest, ServiceRequestDto>(serviceRequest);
    }
    
    public async Task<ServiceRequestDto> CreateRequestAsync(CreateRequestDto input)
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

        //user location into point to calculate the nearby garages and mechanics
        
        var userLocation = new Point(input.LocationCoordinates.Longitude, input.LocationCoordinates.Latitude);
        var radiusInMeters = input.RadiusInKm * 1000;
        
        var garages = await garageRepository.GetNearbyGaragesAsync(userLocation, radiusInMeters );
        var mechanics = await mechanicRepository.GetNearbyMechanicsAsync(userLocation, radiusInMeters);
        
        var nearbyGarages = mapper.Map<ICollection<Garage>, ICollection<GarageDto>>(garages);
        var nearbyMechanics = mapper.Map<ICollection<Mechanic>, ICollection<MechanicDto>>(mechanics);
        
        var serviceRequestDto = new ServiceRequestDto()
        {
            Request = request,
            NearbyGarages = nearbyGarages,
            NearbyMechanics =  nearbyMechanics
            
        };

        return serviceRequestDto;
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

    public async Task<NearbyServiceProviderDto> GetNearbyServiceProviderAsync(LocationCoordinationDto input, double radiusInKm )
    {
        var userLocation = new Point(input.Longitude, input.Latitude);
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