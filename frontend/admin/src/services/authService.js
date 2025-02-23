import { loginAPI } from '../api/auth.js';

export const login = async (email, password) => {
  try {
    const response = await loginAPI(email, password);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi đăng nhập' };
  }
};
