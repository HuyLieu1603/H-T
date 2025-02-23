import axios from 'axios';
import { API_BASE_URL } from '../configs/config.js';

export const login = async (email, password) => {
  return await axios.post(`${API_BASE_URL}/login`, {
    email,
    password,
  });
};
