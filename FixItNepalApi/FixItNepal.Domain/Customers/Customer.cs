using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Shared;

namespace FixItNepal.Domain.Customers;

public class Customer:AppUser
{
    [StringLength(ApiConst.MaxNameLength)]
    public string Name { get; set; } = null!;
}
