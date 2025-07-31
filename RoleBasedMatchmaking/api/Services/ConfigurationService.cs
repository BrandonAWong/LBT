namespace RoleDashboard.Services
{
    public class ConfigurationService
    {
        private readonly IConfiguration _config;

        public ConfigurationService(IConfiguration config)
        {
            _config = config;
        }

        public string GetServiceNowConfig(string resource)
        {
            string? value = _config[$"ServiceNow:{resource}"];
            if (value is null)
                throw new Exception($"'{resource}' is not configured for Service Now");
            return value;
        }
    }
}