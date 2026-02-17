using System.ComponentModel.DataAnnotations;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Domain.Shared;

namespace FixItNepal.Application.Contracts.Garages;

public class CreateUpdateGarageDto
{
    [Required]
    public string Name { get; set; } = null!;
    
    [Required]
    [Phone]
    public string PhoneNumber { get; set; } = null!;
    
    [Required]
    [EmailAddress]
    public string EmailAddress { get; set; } = null!;
    
    [Required]
    [MaxLength(ApiConst.MaxPasswordLength)]
    public string PassWord { get; set; } = null!;

    [Required] public CreateAddressDto Address { get; set; } = null!;
}