using AutoMapper;
using FixItNepal.Application.Contracts.AppUsers;
using FixItNepal.Application.Contracts.Garages;
using FixItNepal.Domain.AppUsers;
using FixItNepal.Domain.Customers;
using FixItNepal.Domain.Garages;
using FixItNepal.Domain.Mechanics;

namespace FixItNepal.Application.AutomapperProfiles;

public class AppUserAutomapperProfile:Profile
{
    public AppUserAutomapperProfile()
    {
        CreateMap<AppUser, SuperAdminAppUserDto>();
        CreateMap<Garage, GarageAppUserDto>()
            .ForMember(dest => dest.Address, opt => opt.MapFrom(g => g.Address))
            .ForMember(dest => dest.Logo, opt => opt.MapFrom(g => g.Logo))
            .ForMember(dest => dest.Documents, opt => opt.MapFrom(g => g.GarageMediaFiles.Select(x => x.MediaFile)));
        
        CreateMap<Mechanic, MechanicAppUserDto>()
            .ForMember(dest => dest.Address, opt => opt.MapFrom(g => g.Address))
            .ForMember(dest => dest.Logo, opt => opt.MapFrom(g => g.Logo))
            .ForMember(dest => dest.Documents, opt => opt.MapFrom(g => g.MechanicMediaFiles.Select(x => x.MediaFile)));
        
        CreateMap<Customer, CustomerAppUserDto>();
    }
}