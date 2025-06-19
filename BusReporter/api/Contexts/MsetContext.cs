using Microsoft.EntityFrameworkCore;
using Bus.Models;

namespace Bus.Contexts
{
    public class MsetContext : DbContext
    {
        public MsetContext(DbContextOptions<MsetContext> options)
            : base(options)
        {
        }

        public DbSet<RemoteSite> RemoteSites { get; set; }
    }
}