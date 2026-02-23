using System.ComponentModel.DataAnnotations;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.MediaFiles;
using FixItNepal.Domain.Shared;

namespace FixItNepal.Application.Contracts.Mechanics;

public class CreateUpdateMechanicsDto
{
    [Required]
    public string Name { get; set; } = null!;
    [Required]
    [Phone]
    public string PhoneNumber { get; set; } = null!;
    
    [Required]
    public Guid LogoId { get; set; }

    [Required]
    [EmailAddress]
    public string EmailAddress { get; set; } = null!;
    
    [Required]
    [MaxLength(ApiConst.MaxPasswordLength)]
    public string PassWord { get; set; } = null!;
    
    [Required] public CreateAddressDto Address { get; set; } = null!;
    
    public ICollection<CreateDocumentMediaFileDto> DocumentMediaFiles { get; set; } = new List<CreateDocumentMediaFileDto>();

}