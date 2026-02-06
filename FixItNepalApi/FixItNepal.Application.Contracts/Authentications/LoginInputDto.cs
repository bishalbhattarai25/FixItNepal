using System.ComponentModel.DataAnnotations;

namespace FixItNepal.Application.Contracts.Authentications;

public class LoginInputDto
{
    [Required] [Phone] public string PhoneNumber { get; set; } = null!;

    [Required] public string Password { get; set; } = null!;
}