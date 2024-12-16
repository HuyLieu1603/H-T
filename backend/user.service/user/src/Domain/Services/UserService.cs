using Domain.Interfaces;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace user.src.Domain.Services
{
	public class UserService : ControllerBase
	{
		private readonly IUserRepository userRepository;

		public UserService(IUserRepository user)
		{
			userRepository = user;
		}

		//Fetch list user
		public async Task<List<User>> FetchListUser()
		{
			var listUser = await userRepository.FetchListUserAsync();
			if (listUser == null)
				throw new Exception("Không thể tải dữ liệu danh sách người dùng");
			return listUser;
		}
		//Get user by id
		public async Task<User> GetUserAsync(Guid idUser)
		{
			var user = await userRepository.GetUserByIdAsync(idUser);
			if (user == null)
				throw new Exception("Không thể tải dữ liệu người dùng!");
			return user;
		}
	}
}