import axios from 'axios';
import { API_BASE_URL } from '../../configs/config.js';

//Fetch list product
export const fetchListProduct = async () => {
	const respond = await axios.get(`${API_BASE_URL}/listProduct`);
	return respond.data;
};
