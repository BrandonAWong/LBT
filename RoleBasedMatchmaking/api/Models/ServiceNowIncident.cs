namespace RoleDashboard.Models
{
    public class ServiceNowIncident
    {
        public string description { get; set; } = string.Empty;
        public string short_description { get; set; } = string.Empty;
        public string opened_by { get; set; } = string.Empty;
        public string assigned_to { get; set; } = string.Empty;
        public string category { get; set; } = string.Empty;
        public string subcategory { get; set; } = string.Empty;
        public int priority { get; set; } = 4;
        public int impact { get; set; } = 3;
        public int urgency { get; set; } = 3;
    }
}