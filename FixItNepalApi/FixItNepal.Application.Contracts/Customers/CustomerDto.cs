namespace FixItNepal.Application.Contracts.Customers;

public class CustomerDto
{
    public Guid Id { get; set;}
    public string PhoneNumber { get; set; } = null!;
}