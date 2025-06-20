using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RoleDashboard.Contexts;
using RoleDashboard.Managers;
using RoleDashboard.Models;

namespace RoleDashboard.Controllers
{
    [Route("api/role-pipeline")]
    [ApiController]
    [Produces("application/json")]
    public class RolePipelineController : Controller
    {
        private readonly RolePipelineManager _manager;

        public RolePipelineController(RolePipelineContext context)
        {
            _manager = new(context);
        }

        [HttpGet, Route("{title}/details")]
        public async Task<ActionResult<TitleDetail>> GetTitleDetails([FromRoute] string title)
        {
            try
            {
                TitleDetail? details = await _manager.GetTitleDetails(title);

                if (details != null)
                {
                    return Ok(details);
                }
                else
                {
                    return NoContent();
                }
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
