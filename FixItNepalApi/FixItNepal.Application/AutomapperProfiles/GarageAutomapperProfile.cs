using AutoMapper;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Domain.Garages;

namespace FixItNepal.Application.AutomapperProfiles;

public class GarageAutomapperProfile: Profile
{
    public GarageAutomapperProfile()
    {
        CreateMap<Garage, GarageDto>();
        CreateMap<CreateUpdateGarageDto, Garage>();
    }
}