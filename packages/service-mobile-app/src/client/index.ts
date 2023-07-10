import axios from 'axios';

const backendApi = axios.create({
	baseURL: 'https://175d-84-14-171-98.ngrok-free.app',
	timeout: 8000,
});

export default backendApi;
