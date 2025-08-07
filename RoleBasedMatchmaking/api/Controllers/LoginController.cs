using Microsoft.AspNetCore.Mvc;
using RoleDashboard.Contexts;
using RoleDashboard.Managers;
using RoleDashboard.Models;
using System.Security.Principal;

namespace RoleDashboard.Controllers
{
    [Route("onboarding-api/login")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : Controller
    {
        RolePipelineContext _context;
        private readonly IWebHostEnvironment _env;

        public LoginController(RolePipelineContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet, Route("")]
        public ActionResult<User> GetUser()
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
                    Admin = groups.Contains(_context.Constants.Find("AdminGroup")?.Value ?? string.Empty)
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
