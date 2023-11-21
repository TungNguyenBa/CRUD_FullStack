using Microsoft.EntityFrameworkCore;

namespace CRUD.Models
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Students> Student { get; set; }

    }
}
