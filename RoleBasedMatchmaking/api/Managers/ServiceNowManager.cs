using System.Text;
using RoleDashboard.Models;
using RoleDashboard.Services;

namespace RoleDashboard.Managers
{
    public class ServiceNowManager
    {
        private readonly ConfigurationService _configService;
        private readonly ConstantsManager _constantsMan;

        public ServiceNowManager(ConfigurationService configService, ConstantsManager constantsMan)
        {
            _configService = configService;
            _constantsMan = constantsMan;
        }

        internal async Task<Uri?> CreateIncident(OnboardingFormPayload payload)
        {
            using (HttpClient client = new())
            {
                byte[] credentials = Encoding.ASCII.GetBytes(
                    _configService.GetServiceNowConfig("Username") +
                    $":{_configService.GetServiceNowConfig("Password")}");

                client.DefaultRequestHeaders.Authorization = new("Basic", Convert.ToBase64String(credentials));

                ServiceNowIncident incident = new()
                {
                    description = @$"Employee Name: {payload.EmployeeName}
                        Start Date: {payload.StartDate.ToString("M/d/yyyy")}
                        {(payload.EmployeeId != null ? $"Employee ID: {payload.EmployeeId}" : string.Empty)}
                        Title: {payload.Title}
                        Department: {payload.Department}
                        {(payload.EllipseClone != null ? $"Ellipse Clone: {payload.EllipseClone}" : string.Empty)}
                        {(payload.Equipment.Count > 0 ? $"Equipment: {string.Join(", ", payload.Equipment)}" : string.Empty)}
                        {(payload.Offices.Count > 0 ? $"Offices: {string.Join(", ", payload.Offices)}" : string.Empty)}
                        {(payload.DistributionGroups.Count > 0 ? $"Distribution Groups: {string.Join(", ", payload.DistributionGroups)}" : string.Empty)}",
                    short_description = $"New Employee IT Request: {payload.EmployeeName} - {payload.Title} ({payload.Department})",
                    assigned_to = await _constantsMan.GetConstant("Form Assigned To"),
                    opened_by = payload.OpenedBy,
                    category = "request",
                    subcategory = "New Hire"
                };

                HttpResponseMessage response = await client.PostAsync(
                    $"{_configService.GetServiceNowConfig("BaseUrl")}/now/table/incident",
                    JsonContent.Create(incident));

                return response.Headers.Location;
            }
        }
    }
}