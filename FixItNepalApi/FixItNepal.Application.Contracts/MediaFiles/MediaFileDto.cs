using FixItNepal.Domain.Shared.MediaFiles;

namespace FixItNepal.Application.Contracts.MediaFiles;

public class MediaFileDto
{
    public Guid Id { get; set; }
    public string OriginalFileName { get; set; } = null!;
    public MediaFileType FileType { get; set; }
    public string Extension { get; set; } = null!;
    public string MimeType { get; set; } = null!;
    public string AccessUrl { get; set; } = null!;
}