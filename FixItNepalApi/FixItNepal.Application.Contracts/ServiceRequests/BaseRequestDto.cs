using System.ComponentModel.DataAnnotations;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Domain.Shared.ServiceRequests;

namespace FixItNepal.Application.Contracts.ServiceRequests;

public class BaseRequestDto
{
    public RequestType RequestType { get; set; }
    public ProblemType ProblemType { get; set; }
    public DateTime? ScheduledDate { get; set; }
    public string? ProblemDescription { get; set; } = null;
}