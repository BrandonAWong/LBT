using RoleDashboard.Contexts;
using RoleDashboard.Models;

namespace RoleDashboard.Managers
{
    public class ConstantsManager
    {
        private readonly RolePipelineContext _context;

        public ConstantsManager(RolePipelineContext context)
        {
            _context = context;
        }

        internal async Task<string> GetConstant(string key)
        {
            Constant? result = await _context.Constants.FindAsync(key);
            return result?.Value ?? string.Empty;
        }
    }
}