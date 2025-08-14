using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoleDashboard.Contexts;
using RoleDashboard.Managers;
using RoleDashboard.Models;

namespace RoleDashboard.Controllers
{
    [Route("onboarding-api/constants")]
    [ApiController]
    [Produces("application/json")]
    public class ConstantsController : Controller
    {
        RolePipelineContext _context;
        ConstantsManager _manager;

        public ConstantsController(RolePipelineContext context)
        {
            _context = context;
            _manager = new(context);
        }

        [HttpGet, Route("")]
        public async Task<ActionResult<List<Constant>>> GetConstants()
        {
            try
            {
                return Ok(await _context.Constants.OrderBy(c => c.Name).ToListAsync());
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

        [HttpGet, Route("{key}")]
        public async Task<ActionResult<string>> GetConstant([FromRoute] string key)
        {
            try
            {
                return Ok(await _manager.GetConstant(key));
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

        [HttpPut, Route("{key}")]
        public async Task<IActionResult> UpdateConstant([FromRoute] string key, [FromBody] Constant payload)
        {
            try
            {
                _context.Constants.Update(payload);
                await _context.SaveChangesAsync();
                return NoContent();
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
