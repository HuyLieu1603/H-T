using Microsoft.EntityFrameworkCore;
using Domain.Models;

namespace user.src.Infrastructure.DataAccess
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }
	}
}