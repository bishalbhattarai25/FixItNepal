namespace FixItNepal.Application.Contracts.Authentications;

public class LoginDto
{
    public string AccessToken { get; set; } = null!;
    public DateTime ExpireAt { get; set; }
    public string UserId { get; set; } = null!;
    public string Role { get; set; } = null!;
}