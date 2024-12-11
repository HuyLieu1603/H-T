using Microsoft.EntityFrameworkCore;
using Domain.Models;

namespace user.src.Infrastructure.DataAccess
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }
		public DbSet<Role> roles { get; set; }
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>()
			.HasOne(u => u.Role)
			.WithMany(r => r.Users)
			.HasForeignKey(u => u.IdRole);
			modelBuilder.Entity<Role>().HasKey(r => r.IdRole);
			base.OnModelCreating(modelBuilder);
		}
	}
}