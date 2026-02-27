using FixItNepal.Domain.Customs;
using FixItNepal.Domain.MediaFiles;

namespace FixItNepal.Domain.Mechanics;

public class MechanicMediaFile:BaseEntity
{
    public Guid MechanicId { get; set; }
    public Mechanic Mechanic { get; set; } = null!;
    public Guid MediaFileId { get; set; }
    public MediaFile MediaFile { get; set; } = null!;
}