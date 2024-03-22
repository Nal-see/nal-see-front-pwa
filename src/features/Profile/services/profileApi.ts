import { ProfileFeedData } from '@/types/profile';
import axios from 'axios';

export async function getProfileFeed({
  userId,
  lastPostId,
}: {
  userId: string | undefined;
}): Promise<ProfileFeedData> {
  console.log('lastPostId: ', lastPostId);
  // /api/posts/users/1?lastPostId=20
  const response = await axios.get(
    `/api/posts/users/${userId}?lastPostId=${lastPostId}`,
  );
  console.log('response: 프로필 피드 리스트', response);

  return response.data;
}

export async function getProfileUserData(userId: string) {
  const response = await axios.get(`/api/users/${userId}`);
  console.log('response: 프로필 데이터', response);

  return response.data;
}
