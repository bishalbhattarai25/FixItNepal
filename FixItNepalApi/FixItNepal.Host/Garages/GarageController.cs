using FixItNepal.Application.Contracts.Garages;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.Garages;

[ApiController]
[Route("api/[controller]")]
public class GarageController (
    IGarageService garageService
    ): ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetListAsync()
    {
        var garages = await garageService.GetListAsync();
        return Ok(garages);
    }
    
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetAsync(Guid id)
    {
        var garage = await garageService.GetAsync(id);
        return Ok(garage);
    }
    
    [HttpPost]
    public async Task<GarageDto> CreateAsync([FromBody] CreateUpdateGarageDto input)
    {
        var garage = await garageService.CreateAsync(input);
        return garage;
    }
}