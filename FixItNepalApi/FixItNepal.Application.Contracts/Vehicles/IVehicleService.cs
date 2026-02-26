using FixItNepal.Domain.Customs.PagedResult;

namespace FixItNepal.Application.Contracts.Vehicles;

public interface IVehicleService
{
    Task<PagedResultDto<VehicleDto>> GetListAsync(VehiclePagedListDto input);
    Task<VehicleDto> GetAsync(Guid id);
    Task<VehicleDto> CreateAsync(CreateVehicleDto vehicleDto);
    Task DeleteAsync(Guid id);
}