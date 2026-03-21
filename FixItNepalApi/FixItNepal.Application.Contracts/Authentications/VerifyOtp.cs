using System.ComponentModel.DataAnnotations;

namespace FixItNepal.Application.Contracts.Authentications;

public class VerifyOtp
{
    [Phone]
    [Required]
    public string PhoneNumber { get; set; } = null!;
    
    [Required]
    public string Otp { get; set; } = null!;
}