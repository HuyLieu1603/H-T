import axios from 'axios';
import { API_BASE_URL } from '../configs/config.js';

// LOGIN
export const login = async (email, password) => {
	return await axios.post(`${API_BASE_URL}/login`, {
		email,
		password,
	});
};

//REGISTER

//LOG OUT
