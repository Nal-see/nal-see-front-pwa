import { api } from '@/lib/api';
import { Feed, FeedDetail, IPostEditFormData } from '@/types/feed';

export async function getFeedList(
  lastPostId: number,
  nowLongitude: number,
  nowLatitude: number,
): Promise<Feed[]> {
  const response = await api.get(
    `/api/posts?lastPostId=${lastPostId}&nowLatitude=${nowLatitude}&nowLongitude=${nowLongitude}`,
  );
  console.log('response: 피드 리스트', response);
  return response.data.results;
}

export async function getFeedDetail(postId: number): Promise<FeedDetail> {
  const response = await api.get(`/api/posts/${postId}`);
  console.log('response.data: ', response.data);
  return response.data.results;
}

// feedApi.ts
export async function addPostLike(postId: number): Promise<void> {
  const response = await api.post(`/api/posts/${postId}/likes`);
  console.log('response.data: ', response.data);
}

export async function cancelPostLike(postId: number): Promise<void> {
  const response = await api.post(`/api/posts/${postId}/likes/cancel`);
  console.log('response.data: ', response.data);
}

export async function updateFeed(
  postId: number,
  data: IPostEditFormData,
): Promise<void> {
  console.log('data: ', data);
  const response = await api.patch(`/api/posts/${postId}`, data);
  console.log('response.data: ', response.data);
}

export async function deletePost(postId: number): Promise<void> {
  const response = await api.delete(`/api/posts/${postId}`);
  console.log('response.data: ', response.data);
}
