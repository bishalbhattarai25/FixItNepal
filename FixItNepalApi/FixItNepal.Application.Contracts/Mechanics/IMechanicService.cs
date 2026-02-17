namespace FixItNepal.Application.Contracts.Mechanics;

public interface IMechanicService
{
    Task<ICollection<MechanicDto>> GetListAsync();
    Task<MechanicDto> GetAsync(Guid id);
    Task<MechanicDto> CreateAsync(CreateUpdateMechanicsDto input);
    Task<MechanicDto> UpdateAsync(Guid id, CreateUpdateMechanicsDto input);
}