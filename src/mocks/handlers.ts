import { http, HttpResponse } from 'msw';
import { feedData } from '@/features/Feed/data/feedData';
import { extractQueryParam } from '@/features/Feed/utils/RegExp';

export const handlers = [
  http.get('/api/posts', (request) => {
    const size = extractQueryParam(request.request.url, 'size');
    const lastPostId = extractQueryParam(request.request.url, 'lastPostId');

    let filteredFeedData = feedData;
    if (lastPostId) {
      const parsedLastPostId = parseInt(lastPostId, 10);
      const lastPostIndex = feedData.findIndex(
        (feed) => feed.id === parsedLastPostId.toString(),
      );
      if (lastPostIndex !== -1) {
        filteredFeedData = feedData.slice(lastPostIndex + 1);
      }
    }

    const parsedSize = size ? parseInt(size, 10) : 10;
    const paginatedFeedData = filteredFeedData.slice(0, parsedSize);

    return HttpResponse.json(paginatedFeedData);
  }),
];
