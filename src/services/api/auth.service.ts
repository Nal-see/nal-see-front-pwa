import { api } from '@/lib/api';
import { type LoginBody } from '@/types/auth';

// Dummy login request that will resolve in 2 seconds
export const login = async (body: LoginBody) => {
  const res = new Promise<boolean>((resolve, reject) => {
    if (body.username !== 'user' || body.password !== 'user') {
      reject(new Error('Invalid username or password'));
    }

    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return await res;
};

// GET : 유저 정보 fetching
export const getUserInfo = async () => {
  try {
    const response = await api.get('/index');
    if (response.status === 200) {
      // 스토어에 유저 정보 저장
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};
