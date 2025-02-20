using System.ComponentModel.DataAnnotations;

namespace user.src.API.Models
{
	public class ChangePassword
	{
		[Required]
		[MinLength(5, ErrorMessage = "Mật khẩu phải chứa ít nhất 5 ký tự")]
		[MaxLength(16, ErrorMessage = "Mật khẩu không được quá 16 ký tự")]
		public string Password;
		[Required]
		[MinLength(5, ErrorMessage = "Mật khẩu phải chứa ít nhất 5 ký tự")]
		[MaxLength(16, ErrorMessage = "Mật khẩu không được quá 16 ký tự")]
		public string NewPassword;
	}
}