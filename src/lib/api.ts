import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { errorInterceptor } from './interceptors';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: `${import.meta.env.VITE_API_BASE_URL}:8080`,
  responseType: 'json',
  withCredentials: true,
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.response.use((response) => response, errorInterceptor);

export { api };
