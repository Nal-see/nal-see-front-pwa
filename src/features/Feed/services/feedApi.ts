import { Feed } from '@/types/feed';
import axios from 'axios';

export async function getFeedList(lastPostId?: number): Promise<Feed[]> {
  const response = await axios.get(
    `/api/posts?lastPostId=${lastPostId}&size=10`,
  );
  return response.data;
}

export async function getComments(page: number): Promise<Comment[]> {
  const response = await axios.get(`/api/comments?page=${page}`);
  return response.data;
}

export async function postComment(comment: { content: string }): Promise<void> {
  await axios.post('/api/comments', comment);
}
