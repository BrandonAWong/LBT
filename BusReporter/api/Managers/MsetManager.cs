using Bus.Contexts;
using Bus.Models;

namespace Bus.Managers
{
    public class MsetManager
    {
        private readonly MsetContext _context;

        public MsetManager(MsetContext context)
        {
            _context = context;
        }

        internal List<RemoteSite> GetRemoteSites()
        {
            return _context.RemoteSites.ToList();
        }
    }
}