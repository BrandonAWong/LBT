using Microsoft.AspNetCore.Mvc;
using RoleDashboard.Managers;
using RoleDashboard.Models;
using RoleDashboard.Services;

namespace RoleDashboard.Controllers
{
    [Route("onboarding-api/servicenow")]
    [ApiController]
    [Produces("application/json")]
    public class ServiceNowController : Controller
    {
        private readonly ServiceNowManager _serviceNowManager;
        public ServiceNowController(ConfigurationService configService)
        {
            _serviceNowManager = new(configService);
        }

        [HttpPost, Route("tickets")]
        public async Task<IActionResult> CreateIncident([FromBody] OnboardingFormPayload payload)
        {
            try
            {
                Uri? sysId = await _serviceNowManager.CreateIncident(payload);
                if (sysId is not null)
                    return Created(sysId, null);

                throw new Exception("ServiceNow ticket unable to be created");
            }
            catch (Exception e)
            {
                return StatusCode(500, new
                {
                    error = e.Message,
                    message = "An unexpected error occured"
                });
            }
        }
    }
}
