using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bus.Models
{
    [Table("event_log")]
    public class EventLog
    {
        [Key]
        [Column("event_log_id")]
        public long Id { get; set; }
        public int SiteId { get; set; }
        public int EventType { get; set; }
        public int EventStart { get; set; }
        public string EventLabel { get; set; } = string.Empty;

        [ForeignKey(nameof(EventType))]
        public EventDescription? EventDescription { get; set; }

        [NotMapped]
        public DateTime? EventTime
        {
            get
            {
                var utc = DateTimeOffset.FromUnixTimeSeconds(EventStart).UtcDateTime;
                var pacificZone = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");
                return TimeZoneInfo.ConvertTimeFromUtc(utc, pacificZone);
            }
        }
    }
}