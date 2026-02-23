using System.ComponentModel.DataAnnotations;
using FixItNepal.Domain.Customs;
using FixItNepal.Domain.Shared.MediaFiles;

namespace FixItNepal.Domain.MediaFiles;

public class MediaFile:BaseEntity
{
    public MediaFileType FileType { get; init; }

    [StringLength(MediaFileConst.MaxFileStorageProviderLength)]
    public required string StorageProvider { get; init; }

    public ulong SizeInBytes { get; set; }

    [StringLength(MediaFileConst.MaxMimeTypeLength)]
    public required string MimeType { get; init; }

    [StringLength(MediaFileConst.MaxExtensionLength)]
    public required string Extension { get; init; }

    [StringLength(MediaFileConst.MaxOriginalFileNameLength)]
    public required string OriginalFileName { get; set; }
    
    [StringLength(MediaFileConst.MAxUrlLength)]
    public required string Url { get; set; }
    
    [StringLength(MediaFileConst.MaxPublicIdLength)]
    public required string PublicId { get; set; }

    public string MediaFileName => $"{Id:N}{Extension}";
}