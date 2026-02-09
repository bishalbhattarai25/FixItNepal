namespace FixItNepal.Application.Contracts.Garages;

public interface IGarageService
{
    Task<ICollection<GarageDto>> GetListAsync();
    Task<GarageDto> GetAsync(Guid id);
    Task<GarageDto> CreateAsync(CreateUpdateGarageDto input);
    Task<GarageDto> UpdateAsync( Guid id, CreateUpdateGarageDto input);
}