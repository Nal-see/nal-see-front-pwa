import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { errorInterceptor } from './interceptors';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_END_POINT,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.response.use((response) => response, errorInterceptor);

export { api };
