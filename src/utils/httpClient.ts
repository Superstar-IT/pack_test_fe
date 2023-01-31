import axios from 'axios';
import { sessionStorageGet } from './sessionStorage';

export const httpClient = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

httpClient.interceptors.request.use(function (config) {
  const token = sessionStorageGet('access_token', '');

  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});
