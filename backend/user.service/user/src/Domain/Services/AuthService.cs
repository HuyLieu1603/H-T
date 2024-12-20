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
		public AuthService(IUserRepository userRepository, IConfiguration configuration)
		{
			_userRepository = userRepository;
			_configuration = configuration;
			_jwtSecret = _configuration["Jwt:Secret"];
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
			Console.WriteLine(req.NewPassword);
			Console.WriteLine(user.Password);
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
			var claims = new[]
			{
				new Claim(ClaimTypes.Name, user.Email),
				new Claim("idRole",user.IdRole.ToString()),
				new Claim("UserId",user.IdUser.ToString()),
			};

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