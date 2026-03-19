namespace FixItNepal.Domain.Shared;

public class ApiConst
{
    public const string ApiName = "FixItNepal";
    public const string ApiDescription = "FixItNepal API";
    public const string ApiVersion = "1.0";
    public const string ApiBaseUrl = "https://api.fixitnepal.com";
    
    public const string DbTablePrefix = "App";

    public const string AppSuperAdminEmail = "fixitnepal@test.com";
    public const string AppSuperAdminPhone = "9800000001";
    public const string AppSuperAdminPassword = "Test@123";
    public const string AppSuperAdminRoleName = "SuperAdmin";
    public const string AppGarageRoleName = "Garage";
    public const string AppMechanicRoleName = "Mechanic";
    public const string AppCustomerRoleName = "Customer";
    
    public const int MaxPasswordLength = 20;
    public const int MaxNameLength = 100;
}