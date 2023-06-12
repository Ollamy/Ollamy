import axios from 'axios';

const backendApi = axios.create({
  baseURL: 'https://98a5-2a01-e34-ec52-1080-5560-d34e-3e92-3b91.ngrok-free.app',
  timeout: 8000,
});

export default backendApi;
