using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.Shared;

namespace FixItNepal.Application.Contracts.Mechanics;

public class CreateUpdateMechanicsDto
{
    [Required]
    [Phone]
    public string PhoneNumber { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string EmailAddress { get; set; } = null!;
    
    [Required]
    [MaxLength(ApiConst.MaxPasswordLength)]
    public string PassWord { get; set; } = null!;
}