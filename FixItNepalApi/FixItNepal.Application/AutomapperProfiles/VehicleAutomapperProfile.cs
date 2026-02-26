using AutoMapper;
using FixItNepal.Application.Contracts.Vehicles;
using FixItNepal.Domain.Vehicles;

namespace FixItNepal.Application.AutomapperProfiles;

public class VehicleAutomapperProfile:Profile
{
    public VehicleAutomapperProfile()
    {
        CreateMap<Vehicle, VehicleDto>();
        CreateMap<CreateVehicleDto, Vehicle>();
    }
}