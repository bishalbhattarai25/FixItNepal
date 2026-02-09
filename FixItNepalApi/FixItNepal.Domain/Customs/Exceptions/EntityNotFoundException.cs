namespace FixItNepal.Domain.Customs.Exceptions;

public class EntityNotFoundException : Exception
{
    public EntityNotFoundException(Type entityType, Guid id)
        : base($"{entityType.Name} with Id {id} was not found.")
    {
    }
}