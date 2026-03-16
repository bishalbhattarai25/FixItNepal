namespace FixItNepal.Domain.Shared.Exceptions;

public class ApiErrorResponse
{
    public bool Success { get; set; } = false;
    public string Code { get; set; } = null!;
    public string Message { get; set; } = null!;
    public int StatusCode { get; set; }
}