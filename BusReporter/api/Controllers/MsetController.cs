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
        public ActionResult<List<RemoteSite>> GetRemoteSites()
        {
            try
            {
                return Ok(_manager.GetRemoteSites());
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