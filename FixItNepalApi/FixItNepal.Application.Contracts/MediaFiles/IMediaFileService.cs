using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.Shared.MediaFiles;

namespace FixItNepal.Application.Contracts.MediaFiles;

public interface IMediaFileService
{
   Task <MediaFileDto> CreateMediaFile(CreateMediaFileDto input);
}