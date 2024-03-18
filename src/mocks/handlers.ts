import { http, HttpResponse } from 'msw';
import { feedData } from '@/features/Feed/data/feedData';
import { extractQueryParam } from '@/features/Feed/utils/RegExp';
import comments from '@/features/Feed/data/commentData';

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
  http.get('/api/comments', (request) => {
    const size = extractQueryParam(request.request.url, 'size');
    const lastCommentId = extractQueryParam(
      request.request.url,
      'lastCommentId',
    );

    let filteredComments = comments;
    if (lastCommentId) {
      const parsedLastCommentId = parseInt(lastCommentId, 10);
      const lastCommentIndex = comments.findIndex(
        (comment) => comment.id === parsedLastCommentId,
      );
      if (lastCommentIndex !== -1) {
        filteredComments = comments.slice(lastCommentIndex + 1);
      }
    }

    const parsedSize = size ? parseInt(size, 10) : 10;
    const paginatedComments = filteredComments.slice(0, parsedSize);

    return HttpResponse.json(paginatedComments);
  }),
  http.get('/index', () => {
    return HttpResponse.json(
      {
        id: '2',
        username: 'TestUser',
        email: 'test@example.com',
        newUser: true,
      },
      {
        status: 200,
      },
    );

    // access token 만료
    // return HttpResponse.json(null, {
    //   status: 401,
    // });

    // refresh token 만료
    // return HttpResponse.json(null, {
    //   status: 403,
    // });
  }),
];
