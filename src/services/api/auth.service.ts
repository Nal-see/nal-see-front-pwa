import { api } from '@/lib/api';

// GET : 유저 정보 fetching
export const getUserInfo = async () => {
  try {
    const response = await api.get('/index');
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log('error!!', error);
    return null;
  }
};
