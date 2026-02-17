using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Shared;

namespace FixItNepal.Domain.Garages;

public class Garage:AppUser
{
    [StringLength(ApiConst.MaxNameLength)]
    public string Name { get; set; } = null!;
}