using Microsoft.AspNetCore.Mvc;
using RoleDashboard.Managers;
using RoleDashboard.Models;

namespace RoleDashboard.Controllers
{
    [Route("api/active-directory")]
    [ApiController]
    [Produces("application/json")]
    public class ActiveDirectoryController : Controller
    {
        private readonly ActiveDirectoryManager _activeDirectoryManager;
        public ActiveDirectoryController(ActiveDirectoryManager manager)
        {
            _activeDirectoryManager = manager;
        }

        [HttpGet, Route("titles")]
        public ActionResult<Dictionary<string, int>> GetTitles()
        {
            try
            {
                return Ok(_activeDirectoryManager.GetTitles());
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

        [HttpGet, Route("titles/{title}/groups")]
        public ActionResult<Dictionary<string, int>> GetGroupsByTitle([FromRoute] string title)
        {
            try
            {
                return Ok(_activeDirectoryManager.GetGroupsByTitle(title));
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

        [HttpGet, Route("titles/groups/common-per-title")]
        public ActionResult<Dictionary<string, List<string>>> GetCommonGroupsForAllTitles()
        {
            try
            {
                return Ok(_activeDirectoryManager.GetCommonGroupsForAllTitles());
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
        
        [HttpGet, Route("titles/users")]
        public ActionResult<List<AdUser>> GetUsersPerTitle()
        {
            try
            {
                return Ok(_activeDirectoryManager.GetAllUsers());
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
