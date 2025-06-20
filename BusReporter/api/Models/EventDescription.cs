using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bus.Models
{
    [Table("event_description")]
    public class EventDescription
    {
        [Key]
        [Column("event_descr_id")]
        public int DescriptionId { get; set; }

        [Column("event_descr")]
        public string Description { get; set; } = string.Empty;

        public int EventType { get; set; }
    }
}