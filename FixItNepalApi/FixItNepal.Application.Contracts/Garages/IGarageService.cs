using FixItNepal.Application.Contracts.Appointments;
using FixItNepal.Application.Contracts.Customs;
using FixItNepal.Application.Contracts.OpeningHours;
using FixItNepal.Application.Contracts.ServiceRequests;
using FixItNepal.Domain.Customs.PagedResult;
using FixItNepal.Domain.Shared.AppUsers;
using FixItNepal.Domain.Shared.ServiceRequests;

namespace FixItNepal.Application.Contracts.Garages;

public interface IGarageService
{
    public Task<PagedResultDto<GarageDto>> GetListAsync(GaragePagedListDto input);
    Task<GarageDto> GetAsync(Guid id);
    Task<GarageDto> CreateAsync(CreateUpdateGarageDto input);
    Task<GarageDto> UpdateAsync( Guid id, CreateUpdateGarageDto input);
    Task UpdateApprovalStatusAsync(Guid id, ApprovalStatus approvalStatus);
    Task<IEnumerable<RequestDto>> GetServiceRequestOfTodayAsync(Guid id);

    Task<ICollection<AppointmentDto>> GetAppointmentsAsync(Guid id, DateTime? date,
        ServiceRequestStatus? status);

    Task<PagedResultDto<RequestDto>> GetRequestHistoryAsync(
        Guid id, 
        DateTime? date, 
        ServiceRequestStatus? status,
        RequestType? type, PagedRequestDto pagedRequest);

    Task<AppointmentAnalyticsDto> GetAppointmentAnalyticsAsync(Guid id);

    Task<OpeningHoursDto> GetOpeningHourAsync(Guid id);

    Task<OpeningHoursDto> UpdateOpeningHoursAsync(
        Guid id,
        OpeningHoursDto input);

}