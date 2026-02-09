using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace FixItNepal.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Scan the assembly of the Application project
        var assembly = Assembly.GetExecutingAssembly(); 
        // Or: typeof(FixItNepal.Application.Garages.GarageAppService).Assembly

        services.Scan(scan => scan
            .FromAssemblies(assembly)
            .AddClasses(classes => classes.Where(c => c.Name.EndsWith("AppService")))
            .AsImplementedInterfaces()
            .WithScopedLifetime()
        );

        return services;
    }
}