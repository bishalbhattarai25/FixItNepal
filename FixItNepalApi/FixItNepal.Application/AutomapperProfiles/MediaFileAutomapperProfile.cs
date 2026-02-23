using AutoMapper;
using FixItNepal.Application.Contracts.MediaFiles;
using FixItNepal.Domain.MediaFiles;

namespace FixItNepal.Application.AutomapperProfiles;

public class MediaFileAutomapperProfile:Profile
{
    public MediaFileAutomapperProfile()
    {
        CreateMap<MediaFile, MediaFileDto>()
            .ForMember(
                dest => dest.AccessUrl,
                opt => opt.MapFrom(src => src.Url)
            );
    }
}