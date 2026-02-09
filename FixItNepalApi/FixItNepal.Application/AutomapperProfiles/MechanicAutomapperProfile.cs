using AutoMapper;
using FixItNepal.Application.Contracts.Mechanics;
using FixItNepal.Domain.Mechanics;

namespace FixItNepal.Application.AutomapperProfiles;

public class MechanicAutomapperProfile: Profile
{
    public MechanicAutomapperProfile()
    {
        CreateMap<Mechanic, MechanicDto>();
    }
}