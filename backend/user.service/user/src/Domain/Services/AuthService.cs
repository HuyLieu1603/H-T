using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Models;
using Domain.Interfaces;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using user.src.API.Models;

namespace Domain.Services
{
	public class AuthService : ControllerBase
	{
		private readonly IUserRepository _userRepository;
		private readonly IConfiguration _configuration;
		private readonly string _jwtSecret;
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
		public AuthService(IUserRepository userRepository, IConfiguration configuration)
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
		{
			_userRepository = userRepository;
			_configuration = configuration;
#pragma warning disable CS8601 // Possible null reference assignment.
			_jwtSecret = _configuration["Jwt:Secret"];
#pragma warning restore CS8601 // Possible null reference assignment.
		}

		//Register function
		public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
		{
			if (await _userRepository.GetUserByEmailAsync(request.Email) != null)
				throw new Exception("Email đã được sử dụng");
			var user = new User
			{
				IdUser = Guid.NewGuid(),
				Email = request.Email,
				Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
				IdRole = request.idRole,
				createAt = DateTime.UtcNow
			};
			await _userRepository.AddUserAsync(user);
			await _userRepository.SaveChangeAsync();
			return new AuthResponse { Token = GenerateJwtToken(user), idRole = user.IdRole };
		}

		//Login function
		public async Task<AuthResponse> LoginAsync(LoginRequest req)
		{
			var user = await _userRepository.GetUserByEmailAsync(req.Email);

			if (user == null)
				throw new Exception("Tài khoản không tồn tại!");

			if (!BCrypt.Net.BCrypt.Verify(req.Password, user.Password))
				throw new Exception("Mật khẩu sai!");

			return new AuthResponse { Token = GenerateJwtToken(user), idRole = user.IdRole };
		}

		//Change password
		public async Task<AuthResponse> ChangePasswordAsync(Guid idUser, ChangePassword req)
		{
			var user = await _userRepository.GetUserByIdAsync(idUser);
			if (user == null)
				throw new Exception("Tài khoản không tồn tại");
			if (!BCrypt.Net.BCrypt.Verify(req.Password, user.Password))
				throw new Exception("Sai mật khẩu!");
			user.Password = BCrypt.Net.BCrypt.HashPassword(req.NewPassword);
			await _userRepository.SaveChangeAsync();
			return new AuthResponse { Token = GenerateJwtToken(user), idRole = user.IdRole };
		}

		//Generate jwt Token function
		private string GenerateJwtToken(User user)
		{
			//Check khóa Secret key
			if (string.IsNullOrEmpty(_jwtSecret))
				throw new ArgumentNullException("JWT secret is not configured properly.");

			//Tạo claims
#pragma warning disable CS8604 // Possible null reference argument.
			var claims = new[]
			{
				new Claim(ClaimTypes.Name, user.Email),
				new Claim("idRole",user.IdRole.ToString()),
				new Claim("UserId",user.IdUser.ToString()),
			};
#pragma warning restore CS8604 // Possible null reference argument.

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: _configuration["Jwt:Issuer"],
				audience: _configuration["Jwt:Audience"],
				claims: claims,
				expires: DateTime.UtcNow.AddHours(1),
				signingCredentials: creds
			);
			return new JwtSecurityTokenHandler().WriteToken(token);

		}
	}
}