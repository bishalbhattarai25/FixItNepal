using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FixItNepal.Application.Contracts.MediaFiles;
using FixItNepal.Domain.MediaFiles;
using FixItNepal.Domain.Repository;
using FixItNepal.Domain.Shared.MediaFiles;

namespace FixItNepal.Application.MediaFiles;

public class MediaFileAppService(
    Cloudinary cloudinary,
    IRepository<MediaFile> mediaFileRepository,
    IMapper mapper)
    : IMediaFileService
{
    public async Task<MediaFileDto> CreateMediaFile(CreateMediaFileDto input)
    {
        if (input.File == null || input.File.Length == 0)
            throw new ArgumentException("File is empty");
        
        await using var stream = input.File.OpenReadStream();
        
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(input.File.FileName, stream),
            Folder = "FixItNepal"
        };
        
        var uploadResult = await cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error != null)
            throw new Exception(uploadResult.Error.Message);
        var mediaFile = new MediaFile
        {
            FileType = input.Type,
            StorageProvider = MediaFileConst.CloudinaryStorageProvider,
            SizeInBytes = (ulong)input.File.Length,
            MimeType = input.File.ContentType,
            Extension = Path.GetExtension(input.File.FileName),
            OriginalFileName = input.File.FileName,
            Url = uploadResult.SecureUrl.ToString(),
            PublicId = uploadResult.PublicId
        };
        mediaFile = await mediaFileRepository.InsertAsync(mediaFile);
        
        return mapper.Map<MediaFile, MediaFileDto>(mediaFile);
        
    }
}