using System.Linq.Expressions;
using AutoMapper;
using FixItNepal.Application.Contracts.Vehicles;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Repository.UnitOfWork;
using FixItNepal.Domain.Vehicles;

namespace FixItNepal.Application.Vehicles;

public class VehicleAppService(
    IRepository<Vehicle> vehicleRepository,
    IMapper mapper,
    IUnitOfWork unitOfWork
    )
    :IVehicleService
{
    public async Task<PagedResultDto<VehicleDto>> GetListAsync(VehiclePagedListDto input)
    {
        var filter = input.CustomerId.HasValue ? (Expression<Func<Vehicle, bool>>)(v => v.CustomerId == input.CustomerId) : null;
        int skipCount = input.SkipCount ?? 0;
        int maxCount = input.MaxCount ?? 10;
        var vehicles = await vehicleRepository.GetPagedListAsync(skipCount,maxCount, filter);
        var vehicleDtos = mapper.Map<ICollection<Vehicle>, ICollection<VehicleDto>>(vehicles.Items);
        return new PagedResultDto<VehicleDto>
        {
            TotalCount = vehicles.TotalCount,
            Items = vehicleDtos
        };
    }

    public async Task<VehicleDto> GetAsync(Guid id)
    {
        var vehicle = await vehicleRepository.GetAsync(id);
        return mapper.Map<Vehicle, VehicleDto>(vehicle);
    }

    public async Task<VehicleDto> CreateAsync(CreateVehicleDto vehicleDto)
    {
        var vehicle = mapper.Map<CreateVehicleDto, Vehicle>(vehicleDto);
        await vehicleRepository.InsertAsync(vehicle);
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
        return mapper.Map<Vehicle, VehicleDto>(vehicle);
    }

    public async Task DeleteAsync(Guid id)
    {
        var vehicle = await vehicleRepository.GetAsync(id);
        await vehicleRepository.RemoveAsync(vehicle);
        await unitOfWork.SaveChangesAsync(CancellationToken.None);
    }
}