using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bus.Models
{
    [Table("remote_sites")]
    public class RemoteSite
    {
        [Key]
        public int SiteId { get; set; }
        public string? SiteName { get; set; }
        public string? IpAddress { get; set; }
        public string? AlternateIpAddress { get; set; }

        [Column("last_event_collect_time")]
        public int? LastCommunicationUnix { get; set; }

        [NotMapped]
        public DateTime? LastCommunication
        {
            get
            {
                if (LastCommunicationUnix == null)
                {
                    return null;
                }

                var utc = DateTimeOffset.FromUnixTimeSeconds(LastCommunicationUnix.Value).UtcDateTime;
                var pacificZone = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");
                return TimeZoneInfo.ConvertTimeFromUtc(utc, pacificZone);
            }
        }
    }
}