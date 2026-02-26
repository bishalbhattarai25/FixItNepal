using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Shared;
using FixItNepal.Domain.Vehicles;

namespace FixItNepal.Domain.Customers;

public class Customer:AppUser
{
    public ICollection<Vehicle>  Vehicles { get; set; } = new Collection<Vehicle>();
}
