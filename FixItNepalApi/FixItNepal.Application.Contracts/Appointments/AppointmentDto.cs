using FixItNepal.Application.Contracts.Customers;
using FixItNepal.Application.Contracts.ServiceRequests;

namespace FixItNepal.Application.Contracts.Appointments;

public class AppointmentDto
{
    public RequestDto Request { get; set; } = null!;
    public CustomerDto Customer { get; set; } = null!;

}