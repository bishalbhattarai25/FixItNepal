using AutoMapper;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Application.Contracts.Mechanics;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Mechanics;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.ServiceRequests;
using FixItNepal.Domain.Shared.ServiceRequests;
using NetTopologySuite.Geometries;

namespace FixItNepal.Application.ServiceRequests;

public class ServiceRequestAppService(
    IMapper mapper,
    IRepository<ServiceRequest> serviceRequestRepository,
    IUnitOfWork unitOfWork,
    IMechanicRepository mechanicRepository,
    IGarageRepository garageRepository
    ):IServiceRequestService
{
    public async Task<ServiceRequestDto> CreateRequestAsync(CreateRequestDto input)
    {
        var address = mapper.Map<CreateAddressDto, Address>(input.Address);
        var serviceRequest = new ServiceRequest()
        {
            ProblemType = input.ProblemType,
            RequestType = input.RequestType,
            ProblemDescription = input.ProblemDescription,
            ScheduledDate = input.ScheduledDate,
            Address = address,
        };

        if (input.RequestType == RequestType.Scheduled && input.ScheduledDate == null)
        {
            throw new BusinessException("ScheduledDateRequired", "Scheduled date cannot be null.");
        }
        
        await serviceRequestRepository.InsertAsync(serviceRequest); 
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
        
        var request =  mapper.Map<ServiceRequest, RequestDto>(serviceRequest);

        //user location into point to calculate the nearby garages and mechanics
        
        var userLocation = new Point(address.LocationCoordinatePoint!.X, address.LocationCoordinatePoint.Y);
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

    public async Task<RequestDto> AssignRequestAsync(Guid id, Guid serviceProviderId)
    {
        var request =  await serviceRequestRepository.GetAsync(id);
        if (request.Status != ServiceRequestStatus.Pending)
        {
            throw new BusinessException("RequestStatusNotPending", "Request status should be pending.");
        }
        
        request.Status = ServiceRequestStatus.Accepted;
        request.ServiceProviderId = serviceProviderId;

        serviceRequestRepository.Update(request);
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
        return mapper.Map<ServiceRequest, RequestDto>(request);
    }


}