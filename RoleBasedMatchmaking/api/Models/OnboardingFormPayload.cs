namespace RoleDashboard.Models
{
    public class OnboardingFormPayload
    {
        public DateTime StartDate { get; set; }
        public string EmployeeName { get; set; } = default!;
        public int? EmployeeId { get; set; }
        public string Title { get; set; } = default!;
        public string Department { get; set; } = default!;
        public string? EllipseClone { get; set; }
        public List<string> Equipment { get; set; } = new();
        public List<string> Offices { get; set; } = new();
        public List<string> DistributionGroups { get; set; } = new();
        public string OpenedBy { get; set; } = string.Empty;
    }
}