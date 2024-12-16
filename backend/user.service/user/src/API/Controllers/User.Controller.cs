using Azure.Core;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using user.src.Domain.Services;

namespace user.src.API.Controllers
{
	[Route("api")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly UserService userService;
		public UserController(UserService user)
		{
			userService = user;
		}
		[HttpGet("fetch-list-user")]
		public async Task<IActionResult> FetchListUser()
		{
			try
			{
				var Response = await userService.FetchListUser();
				return Ok(Response);
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex);
				return BadRequest(new { message = ex.Message });
			}
		}
		[HttpGet("get-user/{idUser}")]
		public async Task<IActionResult> GetUserById([FromRoute] Guid idUser)
		{

			try
			{
				var Response = await userService.GetUserAsync(idUser);
				Console.WriteLine("Ok");
				return Ok(Response);
			}
			catch (Exception ex)
			{
				Console.WriteLine("Có lỗi nè!");
				Console.WriteLine(ex);
				return BadRequest(new { message = ex.Message });
			}
		}

	}
}