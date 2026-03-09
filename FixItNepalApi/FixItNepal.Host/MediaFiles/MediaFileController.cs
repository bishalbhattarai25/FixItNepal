using FixItNepal.Application.Contracts.MediaFiles;
using Microsoft.AspNetCore.Mvc;

namespace FixItNepal.Host.MediaFiles;

[ApiController]
[Route("api/[controller]")]
public class MediaFileController(
    IMediaFileService mediaFileService
) : ControllerBase
{
    [HttpPost]
    public async Task<MediaFileDto> CreateMediaFile(CreateMediaFileDto input)
    {
        var mediaFile = await mediaFileService.CreateMediaFile(input);
        return mediaFile;
    }

    [HttpGet("{id:guid}")]
    public async Task<MediaFileDto> GetMediaFileAsync(Guid id)
    {
        var mediaFile = await mediaFileService.GetMediaFileAsync(id);
        return mediaFile;
    }

}