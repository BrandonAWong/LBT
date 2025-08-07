using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoleDashboard.Models
{
    [Table("constant")]
    public class Constant
    {
        [Key]
        public string Name { get; set; } = default!;
        public string? Value { get; set; }
    }
}