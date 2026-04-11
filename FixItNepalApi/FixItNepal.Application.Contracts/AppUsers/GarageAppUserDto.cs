using System.Collections.ObjectModel;
using FixItNepal.Application.Contracts.Addresses;
using FixItNepal.Application.Contracts.MediaFiles;
using FixItNepal.Domain.Shared.AppUsers;

namespace FixItNepal.Application.Contracts.AppUsers;

public class GarageAppUserDto:BaseAppUserDto
{
    public ApprovalStatus ApprovalStatus { get; set; }
    public AddressDto Address { get; set; } = null!;
    public MediaFileDto Logo { get; set; } = null!;
    public ICollection<MediaFileDto> Documents { get; set; } = new Collection<MediaFileDto>();

}