using System.Collections.ObjectModel;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.MediaFiles;

namespace FixItNepal.Application.Contracts.Mechanics;

public class MechanicDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string PhoneNumber { get; set; }= null!;
    public string UserName { get; set; }= null!;
    public AddressDto Address { get; set; } = null!;
    public MediaFileDto Logo { get; set; } = null!;
    public ICollection<MediaFileDto> Documents { get; set; } = new Collection<MediaFileDto>();

}