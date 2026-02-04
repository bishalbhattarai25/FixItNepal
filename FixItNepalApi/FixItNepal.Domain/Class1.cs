using System.ComponentModel.DataAnnotations;

namespace FixItNepal.Domain;

public class Class1
{
    [Key]
    public Guid Id { get; set; }
    public string Name { get; } = "FixItNepal";
}
