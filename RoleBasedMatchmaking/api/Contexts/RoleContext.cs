using Microsoft.EntityFrameworkCore;
using RoleDashboard.Models;

namespace RoleDashboard.Contexts
{
    public class RolePipelineContext : DbContext
    {
        public RolePipelineContext(DbContextOptions<RolePipelineContext> options)
            : base(options)
        {
        }

        public DbSet<TitleDetail> TitleDetails { get; set; }
    }
}