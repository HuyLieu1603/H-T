using System;
namespace Domain.Models
{
	public class User
	{
		public Guid IdUser { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public string NameUser { get; set; }
		public DateTime BirthDay { get; set; }
		public DateTime createAt { get; set; }
	}
}