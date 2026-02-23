using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.Addresses;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.MediaFiles;
using FixItNepal.Domain.Shared;
using FixItNepal.Domain.Shared.AppUsers;

namespace FixItNepal.Domain.Mechanics;

public class Mechanic:AppUser
{
    [StringLength(ApiConst.MaxNameLength)]
    public string Name { get; set; } = null!;
    
    //logo for the mechanic
    public Guid LogoId { get; set; }
    public MediaFile Logo { get; set; } = null!;
    
    public  required Address Address { get; set; } 
    public ApprovalStatus ApprovalStatus { get; set; } =  ApprovalStatus.Pending;
    
    public ICollection<MechanicMediaFile> MechanicMediaFiles { get; set; } = new Collection<MechanicMediaFile>();
}