import { api } from '@/lib/api';

// GET : 유저 정보 fetching
export const getUserInfo = async () => {
  try {
    const response = await api.get('/api/index');
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log('error!!', error);
    return null;
  }
};

// POST : FCM token 서버에 등록
export const postFCMToken = async (token: string) => {
  const response = api.post('api/v1/fcm/fcmtoken', null, {
    headers: {
      fcmToken: token,
    },
  });

  return response;
};
