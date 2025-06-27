using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RoleDashboard.Models
{
    [Table("title_detail")]
    public class TitleDetail
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;

        public string? Department { get; set; }
        public bool? ActiveDirectory { get; set; }
        public bool? Email { get; set; }
        public bool? PhoneNumber { get; set; }
        public bool? EllipseAccess { get; set; }
        public bool? EllipsePosition { get; set; }
        public bool? Hastus { get; set; }
        public bool? TransitMaster { get; set; }
        public bool? Mdt { get; set; }
        public bool? AdobeAcrobat { get; set; }
        public bool? Docusign { get; set; }
        public bool? OfficeLicense { get; set; }
        public bool? ZoomAccount { get; set; }
        public bool? Corvu { get; set; }
        public string? DistributionGroup { get; set; }
        public string? SecurityGroup { get; set; }
    }
}