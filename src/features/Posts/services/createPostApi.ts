import { api } from '@/lib/api';
import { IPostCreateForm } from '@/types/postCreate';
import { AxiosError } from 'axios';

export const createPostApi = async (userId: string, data: IPostCreateForm) => {
  const formData = new FormData();
  formData.append('requestDto.userId', userId);

  const userInfoKeys = ['height', 'weight', 'constitution', 'style', 'gender'];

  for (const [key, value] of Object.entries(data)) {
    if (key === 'photos') {
      value.forEach((file: File) => {
        formData.append('requestDto.photos', file);
      });
    } else if (userInfoKeys.includes(key))
      formData.append(`requestDto.userInfo.${key}`, value.toString());
    else {
      formData.append(`requestDto.${key}`, value.toString());
    }
  }

  try {
    const response = await api.post('/api/posts', formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const err = error as AxiosError;

    return err.response?.data;
  }
};
