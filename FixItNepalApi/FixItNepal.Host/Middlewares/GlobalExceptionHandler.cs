using System.Text.Json;
using FixItNepal.Domain.Customs.Exceptions;
using FixItNepal.Domain.Shared.Exceptions;

namespace FixItNepal.Host.Middlewares;

public class GlobalExceptionHandler(
    RequestDelegate  next,
    ILogger<GlobalExceptionHandler> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);

            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        
        ApiErrorResponse response;

        if (exception is ApiException apiException)
        {
            response = new ApiErrorResponse
            {
                Code = apiException.Code,
                Message = apiException.Message,
                StatusCode = apiException.StatusCode
            };

            context.Response.StatusCode = apiException.StatusCode;
        }
        else
        {
            response = new ApiErrorResponse
            {
                Code = "INTERNAL_SERVER_ERROR",
                Message = "An unexpected error occurred",
                StatusCode = StatusCodes.Status500InternalServerError
            };

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        }

        context.Response.ContentType = "application/json";

        var result = JsonSerializer.Serialize(response);

        await context.Response.WriteAsync(result);
    }
}