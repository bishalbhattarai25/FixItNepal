namespace FixItNepal.Application.Contracts.Garages;

public interface IGarageService
{
    Task<GarageDto> GetListAsync();
    Task<GarageDto> GetAsync(Guid id);
    Task<GarageDto> CreateAsync(CreateUpdateGarageDto input);
    Task<GarageDto> UpdateAsync(CreateUpdateGarageDto input);
}