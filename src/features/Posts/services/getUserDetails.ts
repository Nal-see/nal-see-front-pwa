import { api } from '@/lib/api';

export const getUserDetails = async () => {
  const response = await api.get('/api/users/userInfo');
  if (response.status === 200) {
    return response.data;
  }
};
