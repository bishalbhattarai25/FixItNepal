using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.MediaFiles;
using FixItNepal.Domain.Shared;
using FixItNepal.Domain.Shared.AppUsers;

namespace FixItNepal.Domain.Garages;

public class Garage:AppUser
{
    [StringLength(ApiConst.MaxNameLength)]
    public string Name { get; set; } = null!;
    
    //logo for the garage
    public Guid LogoId { get; set; }
    public MediaFile Logo { get; set; } = null!;
    public  required Address Address { get; set; }
    public ApprovalStatus ApprovalStatus { get; set; } = ApprovalStatus.Pending;
    
    //documents for the garages 
    public ICollection<GarageMediaFile> GarageMediaFiles { get; set; } = new Collection<GarageMediaFile>();

}