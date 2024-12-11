using System;
using Domain.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using user.src.Infrastructure.DataAccess;
public class UserRepository : IUserRepository
{
	private readonly AppDbContext _context;
	public UserRepository(AppDbContext context)
	{
		_context = context;
	}

	public async Task<User> GetUserByEmailAsync(string email)
	{
		return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
	}

	public async Task AddUserAsync(User user)
	{
		await _context.Users.AddAsync(user);
	}
	public async Task<bool> SaveChangeAsync()
	{
		return await _context.SaveChangesAsync() > 0;
	}

}