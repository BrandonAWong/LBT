using Microsoft.AspNetCore.Mvc;
using RoleDashboard.Contexts;
using RoleDashboard.Managers;
using RoleDashboard.Models;
using System.Security.Principal;
using System.Threading.Tasks;

namespace RoleDashboard.Controllers
{
    [Route("onboarding-api/login")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : Controller
    {
        private readonly IWebHostEnvironment _env;
        private readonly ConstantsManager _constMan;

        public LoginController(IWebHostEnvironment env, ConstantsManager constMan)
        {
            _env = env;
            _constMan = constMan;
        }

        [HttpGet, Route("")]
        public async Task<ActionResult<User>> GetUser()
        {
            try
            {
                if (_env.EnvironmentName != "Production")
                {
                    return Ok(new User
                    {
                        Username = "DEV_USER",
                        Name = "DEV",
                        Admin = true
                    });
                }

                IIdentity? identity = User.Identity;
                if (identity is null)
                    return NoContent();

                ActiveDirectoryManager man = new();
                List<string> groups = man.GetGroupsByUsername(identity.Name!)
                    .Select(g => g.ToUpper())
                    .Where(g => g != string.Empty)
                    .ToList();

                return Ok(new User
                {
                    Username = identity.Name!,
                    Name = man.GetDisplayNameByUsername(identity.Name!),
                    Admin = groups.Contains(await _constMan.GetConstant("Admin Group"))
                });
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
