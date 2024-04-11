import { api } from '@/lib/api';
import { ProfileFeedData } from '@/types/profile';

export async function getProfileFeed({
  userId,
  lastPostId,
}: {
  userId: string | number;
  lastPostId: number;
}): Promise<ProfileFeedData> {
  console.log('lastPostId: ', lastPostId);
  const response = await api.get(
    `/api/posts/users/${userId}?lastPostId=${lastPostId}`,
  );
  console.log('response: 프로필 피드 리스트', response);

  return response.data;
}

export async function getProfileUserData(userId: string) {
  const response = await api.get(`/api/users/${userId}/feed`);
  console.log('response: 프로필 데이터', response);

  return response.data;
}

export async function followUser(userId: string) {
  // /api/users/{userId}/follow
  try {
    const response = await api.post(`/api/users/${userId}/follow`);
    console.log('response: 팔로우', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// /api/users/{userId}/unfollow

export async function unFollowUser(userId: string) {
  try {
    const response = await api.post(`/api/users/${userId}/unfollow`);
    console.log('response: 언팔로우', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfile(data) {
  console.log('data: ', data);
  try {
    const response = await api.post(`/api/users/userInfo`, data);
    console.log('response: 프로필 업데이트', response);
  } catch (error) {
    console.log(error);
  }
}

export async function getLogout() {
  try {
    const response = await api.get(`/api/logout`);
    console.log('response: 로그아웃', response);
  } catch (error) {
    console.log(error);
  }
}
