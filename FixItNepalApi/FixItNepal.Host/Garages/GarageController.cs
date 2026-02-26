using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Shared.AppUsers;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.Garages;

[ApiController]
[Route("api/[controller]")]
public class GarageController (
    IGarageService garageService
    ): ControllerBase
{
    [HttpGet]
    public async Task<PagedResultDto<GarageDto>> GetListAsync([FromQuery] GaragePagedListDto input)
    {
        var garages = await garageService.GetListAsync(input);
        return garages;
    }
    
    [HttpGet("{id:guid}")]
    public async Task<GarageDto> GetAsync(Guid id)
    {
        var garage = await garageService.GetAsync(id);
        return garage;
    }
    
    [HttpPost]
    public async Task<GarageDto> CreateAsync([FromBody] CreateUpdateGarageDto input)
    {
        var garage = await garageService.CreateAsync(input);
        return garage;
    }
    
    [HttpPatch("{id:guid}/approval-status")]
    public async Task UpdateApprovalStatusAsync(Guid id, ApprovalStatus approvalStatus)
    {
        await garageService.UpdateApprovalStatusAsync(id, approvalStatus);
    }
}