using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.Shared.MediaFiles;
using Microsoft.AspNetCore.Http;

namespace FixItNepal.Application.Contracts.MediaFiles;

public class CreateMediaFileDto
{
    [Required] public IFormFile File { get; set; } = null!;
    [Required] public MediaFileType Type { get; set; }
}