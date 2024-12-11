using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Models
{
	public class User
	{
		[Key]
		public Guid IdUser { get; set; }
		public string? Email { get; set; }
		public string? Password { get; set; }
		public string? NameUser { get; set; }
		public int IdRole { get; set; }
		public DateTime? BirthDay { get; set; }
		public DateTime? createAt { get; set; }
		public Role Role { get; set; }
	}
}