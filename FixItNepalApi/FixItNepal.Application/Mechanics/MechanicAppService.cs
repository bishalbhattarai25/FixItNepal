using FixItNepal.Application.Contracts.Mechanics;

namespace FixItNepal.Application.Mechanics;

public class MechanicAppService : IMechanicService
{
    public Task<MechanicDto> GetListAsync()
    {
        throw new NotImplementedException();
    }

    public Task<MechanicDto> GetAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<MechanicDto> CreateAsync(CreateUpdateMechanicsDto input)
    {
        throw new NotImplementedException();
    }

    public Task<MechanicDto> UpdateAsync(CreateUpdateMechanicsDto input)
    {
        throw new NotImplementedException();
    }
}