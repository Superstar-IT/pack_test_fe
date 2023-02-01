import axios from 'axios';
import { sessionStorageGet } from './sessionStorage';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

httpClient.interceptors.request.use(function (config) {
  const token = sessionStorageGet('access_token', '');
  console.log({ token });

  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

export default httpClient;
