using FixItNepal.Application.Contracts.Vehicles;
using FixItNepal.Domain.Customs.PagedResult;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.Vehicles;

[ApiController]
[Route("api/[controller]")]
public class VehicleController(
    IVehicleService vehicleService
    ) :ControllerBase
{
    [HttpGet]
    public async Task<PagedResultDto<VehicleDto>> GetListAsync([FromQuery] VehiclePagedListDto input)
    {
        var vehicles = await vehicleService.GetListAsync(input);
        return vehicles;
    }

    [HttpGet("{id:guid}")]
    public async Task<VehicleDto> GetAsync(Guid id)
    {
        var vehicle = await vehicleService.GetAsync(id);
        return vehicle;
    }

    [HttpPost]
    public async Task<VehicleDto> PostAsync([FromBody] CreateVehicleDto input)
    {
        var vehicle = await vehicleService.CreateAsync(input);
        return vehicle;
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        await vehicleService.DeleteAsync(id);
        return Ok();
    }
}