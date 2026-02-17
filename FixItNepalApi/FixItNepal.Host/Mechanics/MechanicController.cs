using FixItNepal.Application.Contracts.Mechanics;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.Mechanics;

[ApiController]
[Route("api/[controller]")]
public class MechanicController(
    IMechanicService mechanicService
    )

    : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetListAsync()
    {
        var mechanics = await mechanicService.GetListAsync();
        return Ok(mechanics);
    }
    
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetAsync(Guid id)
    {
        var mechanic = await mechanicService.GetAsync(id);
        return Ok(mechanic);
    }
    
    [HttpPost]
    public async Task<MechanicDto> CreateAsync([FromBody] CreateUpdateMechanicsDto input)
    {
        var mechanic = await mechanicService.CreateAsync(input);
        return mechanic;
    }
}