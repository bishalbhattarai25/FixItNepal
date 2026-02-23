using FixItNepal.Application.Contracts.Mechanics;
using FixItNepal.Domain.Shared.AppUsers;
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
    public async Task<IActionResult> GetListAsync([FromQuery] MechanicPagedListDto input)
    {
        var mechanics = await mechanicService.GetListAsync(input);
        return Ok(mechanics);
    }
    
    [HttpGet("{id:guid}")]
    public async Task<MechanicDto> GetAsync(Guid id)
    {
        var mechanic = await mechanicService.GetAsync(id);
        return mechanic;
    }
    
    [HttpPost]
    public async Task<MechanicDto> CreateAsync([FromBody] CreateUpdateMechanicsDto input)
    {
        var mechanic = await mechanicService.CreateAsync(input);
        return mechanic;
    }
    
    [HttpPatch("{id:guid}/approval-status")]
    public async Task UpdateApprovalStatusAsync(Guid id, ApprovalStatus approvalStatus)
    {
        await mechanicService.UpdateApprovalStatusAsync(id, approvalStatus);
    }
}