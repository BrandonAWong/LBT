using Microsoft.AspNetCore.Mvc;
using RoleDashboard.Managers;

namespace RoleDashboard.Controllers
{
    [Route("api/active-directory")]
    [ApiController]
    [Produces("application/json")]
    public class ActiveDirectoryController : Controller
    {
        private readonly ActiveDirectoryManager _activeirectoryManager;
        
        public ActiveDirectoryController(ActiveDirectoryManager manager)
        {
            _activeirectoryManager = manager;
        }

        [HttpGet, Route("titles")]
        public ActionResult<Dictionary<string, int>> GetTitles()
        {
            try
            {
                return Ok(_activeirectoryManager.GetTitles());
            }
            catch
            {
                return StatusCode(500, new
                    {
                        error = "Internal Server Error",
                        message = "An unexpected error occured"
                    });
            }
        }
    }
}