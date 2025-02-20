using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using user.src.API.Models;

[Route("api")]
[ApiController]
public class AuthController : ControllerBase
{
	private readonly AuthService authService;
	public AuthController(AuthService authService)
	{
		this.authService = authService;
	}
	[HttpPost("register")]
	public async Task<IActionResult> Register([FromBody] RegisterRequest request)
	{
		try
		{
			var Response = await authService.RegisterAsync(request);
			Console.WriteLine(request);
			return Ok(Response);
		}
		catch (Exception ex)
		{
			Console.WriteLine(ex);
			return BadRequest(new { message = ex.Message });
		}
	}
	[HttpPost("login")]
	public async Task<IActionResult> Login(LoginRequest request)
	{
		try
		{
			var Response = await authService.LoginAsync(request);
			return Ok(Response);
		}
		catch (Exception ex)
		{
			return BadRequest(new { message = ex.Message });
		}
	}
	[HttpPut("change-password/{idUser}")]
	public async Task<IActionResult> ChangePassword([FromRoute] Guid idUser, ChangePassword request)
	{
		try
		{
			var Response = await authService.ChangePasswordAsync(idUser, request);

			return Ok(Response);
		}
		catch (Exception ex)
		{
			Console.WriteLine("Ok");
			Console.WriteLine(ex);
			return BadRequest(new { message = ex.Message });
		}
	}
}