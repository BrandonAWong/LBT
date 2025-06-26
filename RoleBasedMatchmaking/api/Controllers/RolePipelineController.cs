using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RoleDashboard.Contexts;
using RoleDashboard.Exceptions;
using RoleDashboard.Managers;
using RoleDashboard.Models;
using RoleDashboard.Models.DTO;

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

        [HttpGet, Route("titles")]
        public async Task<ActionResult<List<TitleDetailDto>>> GetAllTitles()
        {
            try
            {
                return await _manager.GetAllTitles();
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

        [HttpGet, Route("titles/{title}")]
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

        [HttpPost, Route("titles")]
        public async Task<IActionResult> CreateTitleDetail([FromBody] TitleDetail title)
        {
            try
            {
                await _manager.CreateTitleDetail(title);
                return Ok();
            }
            catch (ConflictException e)
            {
                return StatusCode(409, new
                {
                    error = e.Message
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

        [HttpPut, Route("titles")]
        public async Task<IActionResult> UpdateTitleDetail([FromBody] TitleDetail title)
        {
            try
            {
                await _manager.UpdateTitleDetail(title);
                return Ok();
            }
            catch (ConflictException e)
            {
                return StatusCode(409, new
                {
                    error = e.Message,
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

        [HttpDelete, Route("titles/{id}")]
        public async Task<IActionResult> DeleteTitleDetail([FromRoute] int id)
        {
            try
            {
                await _manager.DeleteTitleDetail(id);
                return Ok();
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
