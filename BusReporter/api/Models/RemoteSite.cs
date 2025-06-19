using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bus.Models
{
    [Table("remote_sites")]
    public class RemoteSite
    {
        [Key]
        [Column("site_id")]
        public int SiteId { get; set; }

        [Column("site_name")]
        public string? SiteName { get; set; }

        [Column("ip_address")]
        public string? IpAddress { get; set; }

        [Column("alternate_ip_address")]
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