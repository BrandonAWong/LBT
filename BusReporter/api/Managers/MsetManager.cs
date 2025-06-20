using Bus.Contexts;
using Bus.Models;
using Microsoft.EntityFrameworkCore;

namespace Bus.Managers
{
    public class MsetManager
    {
        private readonly MsetContext _context;

        public MsetManager(MsetContext context)
        {
            _context = context;
        }

        internal async Task<List<RemoteSite>> GetRemoteSites()
        {
            return await _context.RemoteSites.ToListAsync();
        }

        internal async Task<List<EventLog>> GetRemoteSiteLog(int siteId)
        {
            return await _context.EventLogs
                .Include(e => e.EventDescription)
                .Where(e => e.SiteId == siteId)
                .OrderByDescending(e => e.EventStart)
                .ToListAsync();
        }
    }
}