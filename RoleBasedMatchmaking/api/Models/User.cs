namespace RoleDashboard.Models
{
    public class User
    {
        public string Username { get; set; } = string.Empty;
        public string? Name { get; set; }
        public bool Admin { get; set; } = false;
    }
}