import { Feed } from '@/types/feed';
import axios from 'axios';

export async function getFeedList(lastPostId?: number): Promise<Feed[]> {
  const response = await axios.get(
    `/api/posts?lastPostId=${lastPostId}&size=10`,
  );
  return response.data;
}

export async function getComments(postId: number): Promise<Comment[]> {
  const response = await axios.get(`/api/posts/${postId}/comments`);
  console.log('response.data: ', response.data);
  return response.data.results;
}

export async function postComment(comment: { content: string }): Promise<void> {
  await axios.post('/api/comments', comment);
}
