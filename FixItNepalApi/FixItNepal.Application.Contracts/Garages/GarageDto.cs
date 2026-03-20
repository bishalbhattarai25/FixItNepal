using System.Collections.ObjectModel;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.MediaFiles;
using FixItNepal.Domain.Shared.AppUsers;

namespace FixItNepal.Application.Contracts.Garages;

public class GarageDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string PhoneNumber { get; set; }= null!;
    public string Name { get; set; } = null!;
    public ApprovalStatus ApprovalStatus { get; set; }
    public string UserName { get; set; }= null!;
    public AddressDto Address { get; set; } = null!;
    public MediaFileDto Logo { get; set; } = null!;
    public ICollection<MediaFileDto> Documents { get; set; } = new Collection<MediaFileDto>();


}