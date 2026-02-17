namespace FixItNepal.Domain.Shared.MediaFiles;

public class MediaFileConst
{
    public const string DigitalOceanStorageProvider = "DigitalOcean";
    public const int MaxFileStorageProviderLength = 50;
    public const int MaxMimeTypeLength = 128;
    public const int MaxExtensionLength = 16;
    public const int MaxOriginalFileNameLength = 256;

    public const int ImageEncodingQuality = 75;
    
    /// <summary>
    /// Max width/height for Image type uploads. Images exceeding this are resized down.
    /// </summary>
    public const int ImageMaxDimension = 1600;

    /// <summary>
    /// Max width/height for Logo (PNG) type uploads. SVG logos are not resized.
    /// </summary>
    public const int LogoMaxDimension = 512;

    /// <summary>
    /// File extensions that are vector-based and should not be resized/compressed.
    /// </summary>
    public static readonly HashSet<string> VectorExtensions = [".svg"];

    /// <summary>
    /// File types that support image processing (resize + compress).
    /// </summary>
    public static readonly HashSet<MediaFileType> ProcessableFileTypes =
    [
        MediaFileType.Image,
        MediaFileType.Logo
    ];

    public static readonly Dictionary<MediaFileType, HashSet<string>> AllowedExtensions = new()
    {
        { MediaFileType.Logo, [".svg", ".png"] },
        { MediaFileType.Image, [".jpg", ".jpeg", ".png", ".gif", ".webp"] },
        { MediaFileType.Video, [".mp4", ".avi"] },
        { MediaFileType.Audio, [".mp3", ".wav"] },
        { MediaFileType.Document, [".pdf", ".docx"] }
    };

    public static readonly IEnumerable<MediaFileType> BrowserFileTypesViewable =
    [
        MediaFileType.Image,
        MediaFileType.Video,
        MediaFileType.Audio,
        MediaFileType.Document
    ];
}