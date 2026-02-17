namespace FixItNepal.Application.Contracts.Garages;

public class GarageDto
{
    public Guid Id { get; set; }
    public string EmailAddress { get; set; } = null!;
    public string PhoneNumber { get; set; }= null!;
    public string UserName { get; set; }= null!;
}