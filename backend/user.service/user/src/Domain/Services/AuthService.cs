using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Models;
using Domain.Interfaces;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Domain.Services
{
	public class AuthService
	{
		private readonly IUserRepository _userRepository;
		private readonly IConfiguration _configuration;
		private readonly string _jwtSecret;
		public AuthService(IUserRepository userRepository, string jwtSecret, IConfiguration configuration)
		{
			_userRepository = userRepository;
			_configuration = configuration;
			_jwtSecret = jwtSecret;
		}

		// public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
		// {
		// 	if(await _userRepository.GetUserByEmailAsync(request.Email)!=null) 
		// 		return BadRequest("Email đã tồn tại!");
		// }

		public async Task<string?> AuthenticateAsync(string email, string Password)
		{
			var user = await _userRepository.GetUserByEmailAsync(email);
			if (user == null || !BCrypt.Net.BCrypt.Verify(Password, user.Password))
				return null;
			return GenerateJwtToken(user);
		}

		private string GenerateJwtToken(User user)
		{
			var claims = new[]
			{
				new Claim(ClaimTypes.Name,user.Email),
				new Claim(ClaimTypes.Role,user.Role.ToString()),
				new Claim("UserId",user.IdUser.ToString()),
			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: "User.Service",
				audience: "User.Service",
				claims: claims,
				expires: DateTime.UtcNow.AddHours(1),
				signingCredentials: creds
			);
			return new JwtSecurityTokenHandler().WriteToken(token);

		}
	}
}