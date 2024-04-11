import { api } from '@/lib/api';
import { IOptionalInfoForm } from '@/types/auth';

export const postOptionalInfo = async (data: IOptionalInfoForm) => {
  const response = await api.post('/api/users/userInfo', {
    ...data,
  });

  return response;
};
