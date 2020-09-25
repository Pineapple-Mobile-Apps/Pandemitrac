using Microsoft.EntityFrameworkCore;
using Pandemitrac.Server.Models.Core;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Models
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Case> Cases { get; set; }
        public DbSet<ChangeDependentSubjectStateEntry> ChangeDependentSubjectStateEntries { get; set; }
        public DbSet<DependentSubject> DependentSubjects { get; set; }
        public DbSet<Editor> Editors { get; set; }
        public DbSet<Visitor> Visitors { get; set; }
        
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}