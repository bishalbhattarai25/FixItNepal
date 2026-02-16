using AutoMapper;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Domain.Garages;

namespace FixItNepal.Application.AutomapperProfiles;

public class GarageAutomapperProfile: Profile
{
    public GarageAutomapperProfile()
    {
        CreateMap<Garage, GarageDto>()
            .ForAllMembers(opt => opt.Ignore());
        CreateMap<CreateUpdateGarageDto, Garage>();
    }
}