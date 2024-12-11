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

		public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
		{
			if (await _userRepository.GetUserByEmailAsync(request.Email) != null)
				throw new Exception("User already exists");
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

		public async Task<AuthResponse> LoginAsync(LoginRequest req)
		{
			var user = await _userRepository.GetUserByEmailAsync(req.Email);

			if (user == null)
				throw new Exception("Tài khoản không tồn tại!");

			if (!BCrypt.Net.BCrypt.Verify(req.Password, user.Password))
				throw new Exception("Mật khẩu sai!");

			return new AuthResponse { Token = GenerateJwtToken(user), idRole = user.IdRole };
		}

		private string GenerateJwtToken(User user)
		{
			if (string.IsNullOrEmpty(_jwtSecret))
				throw new ArgumentNullException("JWT secret is not configured properly.");
			var claims = new[]
			{
				new Claim(ClaimTypes.Name,user.Email),
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