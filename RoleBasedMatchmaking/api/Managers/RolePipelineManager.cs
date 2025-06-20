using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RoleDashboard.Contexts;
using RoleDashboard.Models;

namespace RoleDashboard.Managers
{
    public class RolePipelineManager
    {
        private readonly RolePipelineContext _context;

        public RolePipelineManager(RolePipelineContext context)
        {
            _context = context;
        }

        internal async Task<TitleDetail?> GetTitleDetails(string title)
        {
            return await _context.TitleDetails.FirstOrDefaultAsync(et => et.Title.ToLower() == title.ToLower());
        }
    }
}