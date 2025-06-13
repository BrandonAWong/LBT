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
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new
                {
                    error = e.Message,
                    message = "An unexpected error occured"
                });
            }
        }
        
        [HttpGet, Route("titles/{title}/groups")]
        public ActionResult<Dictionary<string, int>> GetGroupsByTitle([FromRoute] string title)
        {
            try
            {
                return Ok(_activeirectoryManager.GetGroupsByTitle(title));
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