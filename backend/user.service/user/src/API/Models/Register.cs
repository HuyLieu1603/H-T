public class RegisterRequest
{
	public required string Email { get; set; }
	public required string Password { get; set; }
	public int Role { get; set; }
}