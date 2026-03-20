using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Mechanics;
using Microsoft.AspNetCore.Identity;

namespace FixItNepal.Domain.AppUsers;

public class AppUser: IdentityUser<Guid>
{
    public void SetEmailAddress(string email)
    {
        Email = email;
    }
    public void SetUserName(string userName)
    {
        UserName = userName;
    }
    
    public void SetPhoneNumber(string phoneNumber)
    {
        PhoneNumber = phoneNumber;
    }

    public void SetPhoneNumberConfirmed(bool confirmed)
    {
        PhoneNumberConfirmed = confirmed;
    }

    public bool IsCustomer()
    {
        return this is Customer;
    }
    
    public bool IsMechanic()
    {
        return this is Mechanic;
    }
    
    public bool IsGarage()
    {
        return this is Garage;
    }
}