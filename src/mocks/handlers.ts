import { http, HttpResponse } from 'msw';
import { extractQueryParam } from '@/features/Feed/utils/RegExp';
import comments, { Comment } from 'mocks/data/commentData';
import { FeedDataList } from 'mocks/data/feedData';

export const handlers = [
  http.get('/api/posts', (request) => {
    const size = extractQueryParam(request.request.url, 'size');
    const lastPostId = extractQueryParam(request.request.url, 'lastPostId');

    let filteredFeedData = FeedDataList.results;
    if (lastPostId) {
      const parsedLastPostId = parseInt(lastPostId, 10);
      const lastPostIndex = FeedDataList.results.findIndex(
        (feed) => feed.id === parsedLastPostId.toString(),
      );
      if (lastPostIndex !== -1) {
        filteredFeedData = FeedDataList.results.slice(lastPostIndex + 1);
      }
    }

    const parsedSize = size ? parseInt(size, 10) : 10;
    const paginatedFeedData = {
      results: filteredFeedData.slice(0, parsedSize),
    };

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
  http.get('/api/posts/:postId/comments', () => {
    const filteredComments = comments;
    console.log('filteredComment: ', filteredComments);
    return HttpResponse.json(filteredComments);
  }),
  http.post('/api/posts/:postId/likes', () => {
    return HttpResponse.json({
      success: true,
      message: '요청에 성공했습니다.',
      results: [],
    });
  }),
  http.post('/api/posts/:postId/likes/cancel', () => {
    return HttpResponse.json({
      success: true,
      message: '요청에 성공했습니다.',
      results: [],
    });
  }),
  http.post('/api/posts/:postId/comment/:commentId/likes', () => {
    return HttpResponse.json({
      success: true,
      message: '요청에 성공했습니다.',
      results: [],
    });
  }),
  http.post('/api/posts/:postId/comment/:commentId/likes/cancel', () => {
    return HttpResponse.json({
      success: true,
      message: '요청에 성공했습니다.',
      results: [],
    });
  }),
  // http.post('/api/posts/:postId/comments', (request, context) => {
  //   console.log('request: ', request);
  //   const { postId } = request.params;
  //   const { content, userId } = request.body as {
  //     content: string;
  //     userId: number;
  //   };

  //   // 새로운 댓글 객체 생성
  //   const newComment: Comment = {
  //     id: comments.results.length + 1,
  //     content,
  //     likeCNT: 0,
  //     createDate: new Date().toISOString(),
  //     userId,
  //     userImage: 'https://placehold.co/40x40',
  //     username: `User${userId}`,
  //     postId: parseInt(postId as string, 10),
  //     isLiked: false,
  //   };

  //   // 기존 댓글 배열에 새로운 댓글 추가
  //   comments.results.push(newComment);

  //   return HttpResponse.json(
  //     context.status(201),
  //     context.json({
  //       success: true,
  //       message: '댓글이 성공적으로 생성되었습니다.',
  //       results: newComment,
  //     }),
  //   );
  // }),
  http.post('/api/posts/:postId/comments', async (request, context) => {
    const { postId } = request.params;

    // Read and parse the JSON body once
    const requestBody = await request.request.json();

    // Now it's safe to log the requestBody after it's been read
    console.log('requestBody: ', requestBody);

    const { content, userId } = requestBody;

    // 새로운 댓글 객체 생성
    const newComment = {
      // Assuming 'comments' is defined somewhere in your scope
      id: comments.results.length + 1,
      content,
      likeCNT: 0,
      createDate: new Date().toISOString(),
      userId,
      userImage: 'https://placehold.co/40x40',
      username: `User${userId}`,
      postId: parseInt(postId, 10),
      isLiked: false,
    };

    // 기존 댓글 배열에 새로운 댓글 추가
    comments.results.push(newComment);

    return HttpResponse.json({
      success: true,
      message: '댓글이 성공적으로 생성되었습니다.',
      results: newComment,
    });
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
