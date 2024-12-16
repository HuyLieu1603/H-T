using System.ComponentModel.DataAnnotations;

public class LoginRequest
{
	[Required(ErrorMessage = "Email không được để trống")]
	[EmailAddress(ErrorMessage = "Email không hợp lệ")]
	public required string Email { get; set; }
	[Required]
	[MinLength(5, ErrorMessage = "Mật khẩu phải chứa ít nhất 5 ký tự")]
	[MaxLength(16, ErrorMessage = "Mật khẩu không được quá 16 ký tự")]
	public required string Password { get; set; }
}