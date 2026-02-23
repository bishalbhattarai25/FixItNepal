using AutoMapper;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Domain.Garages;

namespace FixItNepal.Application.AutomapperProfiles;

public class GarageAutomapperProfile: Profile
{
    public GarageAutomapperProfile()
    {
        CreateMap<Garage, GarageDto>()
            .ForMember(dest => dest.Address, opt => opt.MapFrom(g => g.Address))
            .ForMember(dest => dest.Logo, opt => opt.MapFrom(g => g.Logo))
            .ForMember(dest => dest.Documents, opt => opt.MapFrom(g => g.GarageMediaFiles.Select(x => x.MediaFile)));
        
        CreateMap<CreateUpdateGarageDto, Garage>();
    }
}