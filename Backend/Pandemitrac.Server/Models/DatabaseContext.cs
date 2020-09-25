using Microsoft.EntityFrameworkCore;
using Pandemitrac.Server.Models.Core;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Models
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Case> Cases { get; }
        public DbSet<ChangeDependentSubjectStateEntry> ChangeDependentSubjectStateEntries { get; }
        public DbSet<DependentSubject> DependentSubjects { get; }
        public DbSet<Editor> Editors { get; }
        public DbSet<Visitor> Visitors { get; }
        
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}