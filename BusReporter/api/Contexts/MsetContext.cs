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
        public DbSet<EventLog> EventLogs { get; set; }
        public DbSet<EventDescription> EventDescriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EventLog>()
                .HasOne(e => e.EventDescription)
                .WithMany()
                .HasForeignKey(e => e.EventType)
                .HasPrincipalKey(ed => ed.EventType);

            base.OnModelCreating(modelBuilder);
        }
    }
}