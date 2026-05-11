using FixItNepal.Application.Contracts.Appointments;
using FixItNepal.Application.Contracts.Customs;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Application.Contracts.OpeningHours;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Shared.AppUsers;
using FixItNepal.Domain.Shared.ServiceRequests;
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

    [HttpGet("{id:guid}/todays-request")]
    public async Task<IEnumerable<RequestDto>> GetServiceRequestOfTodayAsync(Guid id)
    {
        return await garageService.GetServiceRequestOfTodayAsync(id);
    }
    
    
    [HttpPatch("{id:guid}/approval-status")]
    public async Task UpdateApprovalStatusAsync(Guid id, ApprovalStatus approvalStatus)
    {
        await garageService.UpdateApprovalStatusAsync(id, approvalStatus);
    }
    
    [HttpGet("{id:guid}/request-history")]
    public async Task<PagedResultDto<RequestDto>> GetRequestHistoryAsync(Guid id, DateTime? date, ServiceRequestStatus? status, RequestType? requestType, [FromQuery] PagedRequestDto input )
    {
        var requests = await garageService.GetRequestHistoryAsync(id,  date, status, requestType, input);
        return requests;
    }
    
    [HttpGet("{id:guid}/appointments")]
    public async Task<ICollection<AppointmentDto>> GetAppointments(Guid id, DateTime? date, ServiceRequestStatus? status)
    {
        return await garageService.GetAppointmentsAsync(id, date, status);
    }

    [HttpGet("{id:guid}/appointment-analytics")]
    public async Task<AppointmentAnalyticsDto> GetAppointmentAnalyticsAsync(Guid id)
    {
        return await garageService.GetAppointmentAnalyticsAsync(id);

    }

    [HttpGet("{id:guid}/opening-hours")]
    public async Task<OpeningHoursDto> GetOpeningHourAsync(Guid id)
    {
        return await garageService.GetOpeningHourAsync(id);
    }

    [HttpPut("{id:guid}/opening-hours")]
    public async Task<OpeningHoursDto> UpdateOpeningHoursAsync(
        Guid id,
        OpeningHoursDto input)
    {
        return await garageService.UpdateOpeningHoursAsync(id, input);
    }
}