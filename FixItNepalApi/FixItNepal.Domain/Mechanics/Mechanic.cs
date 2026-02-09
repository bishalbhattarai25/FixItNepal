using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Shared;

namespace FixItNepal.Domain.Mechanics;

public class Mechanic:AppUser
{
    [StringLength(ApiConst.MaxNameLength)]
    public string Name { get; set; } = null!;
}