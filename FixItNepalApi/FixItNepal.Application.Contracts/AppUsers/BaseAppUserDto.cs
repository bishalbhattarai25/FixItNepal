namespace FixItNepal.Application.Contracts.AppUsers;

public class BaseAppUserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string PhoneNumber { get; set; }= null!;
    public string Name { get; set; } = null!;
    public string UserName { get; set; }= null!;
}