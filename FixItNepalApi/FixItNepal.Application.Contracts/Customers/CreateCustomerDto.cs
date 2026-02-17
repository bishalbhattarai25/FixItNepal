using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.Shared;

namespace FixItNepal.Application.Contracts.Customers;

public class CreateCustomerDto
{
    [Required]
    [Phone]
    public string PhoneNumber { get; set; } = null!;
    
    [Required]
    [MaxLength(ApiConst.MaxPasswordLength)]
    public string PassWord { get; set; } = null!;
}