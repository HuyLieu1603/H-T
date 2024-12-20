using System;
using Domain.Models;
namespace Domain.Interfaces
{
	public interface IUserRepository
	{
		Task<User> GetUserByEmailAsync(string email);
		Task AddUserAsync(User user);
		Task<bool> SaveChangeAsync();
		Task<List<User>> FetchListUserAsync();
		Task<User?> GetUserByIdAsync(Guid idUser);
		Task<bool> UpdateUserAsync(User user);
	}
}