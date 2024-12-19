using Azure.Core;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using user.src.API.Models.User;
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
				return BadRequest(new { message = ex.Message });
			}
		}
		[HttpGet("get-user/{idUser}")]
		public async Task<IActionResult> GetUserById([FromRoute] Guid idUser)
		{

			try
			{
				var Response = await userService.GetUserAsync(idUser);
				return Ok(Response);
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex);
				return BadRequest(new { message = ex.Message });
			}
		}
		[HttpPut("user/{id}")]
		public async Task<IActionResult> EditUserById([FromRoute] Guid id, [FromBody] UpdateUserRequest req)
		{
			try
			{
				//get user by id
				var user = await userService.GetUserAsync(id);
				if (user == null)
					return NotFound("Người dùng không tồn tại!");
				Console.WriteLine(user.BirthDay);
				//update user
				user.NameUser = req.NameUser ?? user.NameUser;
				user.BirthDay = req.date ?? user.BirthDay;
				//save user 
				var result = await userService.EditUserAsync(user);
				if (!result) return BadRequest("Cập nhật thông tin thất bại!");
				return Ok("Cập nhật thông tin thành công!");
			}
			catch (Exception ex)
			{
				return BadRequest(new { message = ex.Message });
			}
		}

	}
}