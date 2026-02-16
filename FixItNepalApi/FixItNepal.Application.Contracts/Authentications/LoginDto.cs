namespace FixItNepal.Application.Contracts.Authentications;

public class LoginDto
{
    public string AccessToken { get; set; } = null!;
    public DateTime ExpireAt { get; set; }
    public Guid UserId { get; set; }
    public string Role { get; set; } = null!;
}