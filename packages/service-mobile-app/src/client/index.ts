import axios from 'axios';

const backendApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 8000,
  withCredentials: true,
});

export default backendApi;
