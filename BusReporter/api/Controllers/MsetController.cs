using Microsoft.AspNetCore.Mvc;
using Bus.Contexts;
using Bus.Managers;
using Bus.Models;

namespace Controllers
{
    [Route("api/mset")]
    [ApiController]
    [Produces("application/json")]
    public class MsetController : Controller
    {
        private readonly MsetManager _manager;

        public MsetController(MsetContext context)
        {
            _manager = new(context);
        }

        [HttpGet, Route("remote-sites")]
        public async Task<ActionResult<List<RemoteSite>>> GetRemoteSites()
        {
            try
            {
                return Ok(new { result = await _manager.GetRemoteSites() });
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
        
        [HttpGet, Route("remote-sites/logs/{siteId}")]
        public async Task<ActionResult<List<EventLog>>> GetRemoteSiteLog([FromRoute] int siteId)
        {
            try
            {
                return Ok(new { result = await _manager.GetRemoteSiteLog(siteId) });
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