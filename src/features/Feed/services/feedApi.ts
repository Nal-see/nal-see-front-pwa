import { api } from '@/lib/api';
import { Feed } from '@/types/feed';

export async function getFeedList(lastPostId?: number): Promise<Feed[]> {
  const response = await api.get(`/api/posts?lastPostId=${lastPostId}&size=10`);
  console.log('response: 피드 리스트', response);
  return response.data.results;
}

export async function getFeedDetail(postId: number): Promise<Feed> {
  const response = await api.get(`/api/posts/${postId}`);
  console.log('response.data: ', response.data);
  return response.data;
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
