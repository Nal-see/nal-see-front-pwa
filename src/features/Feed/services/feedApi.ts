import { Feed } from '@/types/feed';
import axios from 'axios';

export async function getFeedList(lastPostId?: number): Promise<Feed[]> {
  const response = await axios.get(
    `/api/posts?lastPostId=${lastPostId}&size=10`,
  );
  return response.data;
}
