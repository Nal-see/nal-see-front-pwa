import { api } from '@/lib/api';
import { IPostCreateForm } from '@/types/postCreate';

export const createPostApi = (userId: string, data: IPostCreateForm) => {
  const formData = new FormData();
  const requestDto = JSON.stringify({
    userId,
    content: data.content,
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude,
    userDetailDto: {
      height: data.height,
      weight: data.weight,
      constitution: data.constitution,
      style: data.style,
      gender: data.gender,
    },
  });

  formData.append(
    'requestDto',
    new Blob([requestDto], { type: 'application/json' }),
  );

  data.photos!.forEach((file: File) => {
    formData.append('photos', file);
  });

  return api.post('/api/posts', formData);
};
