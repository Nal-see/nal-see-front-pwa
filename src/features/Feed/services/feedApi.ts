import { Feed } from '@/types/feed';
import axios from 'axios';

export async function getFeedList(lastPostId?: number): Promise<Feed[]> {
  const response = await axios.get(
    `/api/posts?lastPostId=${lastPostId}&size=10`,
  );
  console.log('response: 피드 리스트', response);
  return response.data.results;
}

export async function getComments(postId: number): Promise<Comment[]> {
  const response = await axios.get(`/api/posts/${postId}/comments`);
  console.log('response.data: ', response.data);
  return response.data.results;
}

export async function postComment(
  postId: number,
  content: string,
  userId: string | undefined,
): Promise<void> {
  console.log('userId: ', userId);
  console.log('postId: ', postId);
  console.log('content: ', content);
  if (!userId) throw new Error('User not found');
  const response = await axios.post(`/api/posts/${postId}/comments`, {
    content,
    userId,
  });
  console.log('response.data: ', response.data);
}

// feedApi.ts
export async function addPostLike(postId: number): Promise<void> {
  const response = await axios.post(`/api/posts/${postId}/likes`);
  console.log('response.data: ', response.data);
}

export async function cancelPostLike(postId: number): Promise<void> {
  const response = await axios.post(`/api/posts/${postId}/likes/cancel`);
  console.log('response.data: ', response.data);
}

// feedApi.ts
export async function addCommentLike(
  postId: number,
  commentId: number,
): Promise<void> {
  const response = await axios.post(
    `/api/posts/${postId}/comment/${commentId}/likes`,
  );
  console.log('response.data: ', response.data);
}

export async function cancelCommentLike(
  postId: number,
  commentId: number,
): Promise<void> {
  const response = await axios.post(
    `/api/posts/${postId}/comment/${commentId}/likes/cancel`,
  );
  console.log('response.data: ', response.data);
}
