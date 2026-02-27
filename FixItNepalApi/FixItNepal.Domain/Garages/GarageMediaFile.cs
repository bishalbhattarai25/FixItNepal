using FixItNepal.Domain.Customs;
using FixItNepal.Domain.MediaFiles;

namespace FixItNepal.Domain.Garages;

public class GarageMediaFile:BaseEntity
{
    public Guid GarageId { get; set; }
    public Garage Garage { get; set; } = null!;
    public Guid MediaFileId { get; set; }
    public MediaFile MediaFile { get; set; } = null!;
}