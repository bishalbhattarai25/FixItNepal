using Microsoft.AspNetCore.Identity;

namespace FixItNepal.Domain.AppUsers;

public class AppUser: IdentityUser
{
    public void SetEmailAddress(string email)
    {
        Email = email;
    }
    
    public void SetPhoneNumber(string phoneNumber)
    {
        PhoneNumber = phoneNumber;
    }
}