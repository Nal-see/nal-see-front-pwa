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
  // http.get('/api/posts/:postId/comments', (request, context) => {
  //   console.log('request.params: ', request.params);

  //   const filteredComments = comments;

  //   console.log('filteredComment: ', filteredComments);
  //   return HttpResponse.json(
  //     context.status(200),
  //     context.json({
  //       success: true,
  //       message: '요청에 성공했습니다.',
  //       results: filteredComments,
  //     }),
  //   );
  // }),
  http.get('/api/posts/:postId/comments', (request, response, context) => {
    console.log('request.params: ', request.params);
    const filteredComments = comments;
    console.log('filteredComment: ', filteredComments);
    return HttpResponse.json(filteredComments);
  }),
  http.get('/index', () => {
    return HttpResponse.json({
      id: '2',
      username: 'TestUser',
      email: 'test@example.com',
      newUser: true,
    });

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
