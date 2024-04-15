import { type AxiosError } from 'axios';
import { api } from './api';
import useAuthStore from '@/store/useAuthStore';

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  const { removeUser } = useAuthStore.getState();
  const prevRequest = error.config;
  if (error.response?.status === 401 && prevRequest) {
    return api(prevRequest);
  } else if (error.response?.status === 403) {
    // logout 처리 : zustand store에서 user 삭제
    removeUser();
    window.location.href = `${window.location.origin}/hello`;
  }
  return Promise.reject(error);
};
