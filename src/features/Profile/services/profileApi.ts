import { ProfileFeedData } from '@/types/profile';
import axios from 'axios';

export async function getProfileFeed({
  userId,
  lastPostId,
}: {
  userId: string | undefined;
}): Promise<ProfileFeedData> {
  console.log('lastPostId: ', lastPostId);
  const response = await axios.get(
    `/api/posts/users/${userId}?lastPostId=${lastPostId}`,
  );
  console.log('response: 프로필 피드 리스트', response);

  return response.data;
}

export async function getProfileUserData(userId: string) {
  const response = await axios.get(`/api/users/${userId}/feed`);
  console.log('response: 프로필 데이터', response);

  return response.data;
}

export async function followUser(userId: string) {
  // /api/users/{userId}/follow
  try {
    const response = await axios.post(`/api/users/${userId}/follow`);
    console.log('response: 팔로우', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// /api/users/{userId}/unfollow

export async function unfollowUser(userId: string) {
  try {
    const response = await axios.post(`/api/users/${userId}/unfollow`);
    console.log('response: 언팔로우', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
