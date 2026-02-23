using AutoMapper;
using FixItNepal.Application.Contracts.Mechanics;
using FixItNepal.Domain.Mechanics;

namespace FixItNepal.Application.AutomapperProfiles;

public class MechanicAutomapperProfile: Profile
{
    public MechanicAutomapperProfile()
    {
        CreateMap<Mechanic, MechanicDto>()
            .ForMember(dest => dest.Address, opt => opt.MapFrom(g => g.Address))
            .ForMember(dest => dest.Logo, opt => opt.MapFrom(g => g.Logo))
            .ForMember(dest => dest.Documents, opt => opt.MapFrom(g => g.MechanicMediaFiles.Select(x => x.MediaFile)));
    }
}