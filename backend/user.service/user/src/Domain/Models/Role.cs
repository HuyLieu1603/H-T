using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
	public class Role
	{
		[Key]
		public int IdRole;
		public required string NameRole;
		public required ICollection<User> Users { get; set; }
	}
}