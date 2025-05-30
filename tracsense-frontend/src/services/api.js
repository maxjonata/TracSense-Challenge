import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

api.interceptors.request.use(async config => {
	const token = getToken();
	if (token) {
		config.headers["x-access-token"] = `${token}`;
	}
	return config;
});
  

export default api;