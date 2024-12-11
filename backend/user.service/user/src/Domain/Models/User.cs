using System;
namespace Domain.Models
{
	public class User
	{
		public Guid IdUser { get; set; }
		public required string Email { get; set; }
		public required string Password { get; set; }
		public string NameUser { get; set; }
		public int Role { get; set; }
		public DateTime BirthDay { get; set; }
		public DateTime createAt { get; set; }
	}
}