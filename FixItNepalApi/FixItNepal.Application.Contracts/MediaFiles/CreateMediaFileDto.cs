using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.Shared.MediaFiles;

namespace FixItNepal.Application.Contracts.MediaFiles;

public class CreateMediaFileDto
{
    [Required] public MediaFileType Type { get; set; }
}