import { http, HttpResponse } from 'msw';
import { extractQueryParam } from '@/features/Feed/utils/RegExp';
import comments from 'mocks/data/commentData';
import { FeedDataList } from 'mocks/data/feedData';
import { profileFeedData, profileUserData } from './data/profileFeedData';

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

  http.post('/api/posts/:postId/comments', async (request, context) => {
    const { postId } = request.params;

    const requestBody = await request.request.json();

    console.log('requestBody: ', requestBody);

    const { content, userId } = requestBody;

    const newComment = {
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

    comments.results.push(newComment);

    return HttpResponse.json({
      success: true,
      message: '댓글이 성공적으로 생성되었습니다.',
      results: newComment,
    });
  }),

  http.get('/api/posts/users/:userId', (request) => {
    const lastPostId = extractQueryParam(request.request.url, 'lastPostId');

    let filteredPostList = profileFeedData.results;

    if (lastPostId) {
      const parsedLastPostId = parseInt(lastPostId, 10);
      const lastPostIndex = filteredPostList.findIndex(
        (post) => post.postId === parsedLastPostId,
      );

      if (lastPostIndex !== -1) {
        filteredPostList = filteredPostList.slice(lastPostIndex + 1);
      }
    }

    const responseData = {
      results: filteredPostList.slice(0, 10), // 한 번에 10개의 게시물만 반환
    };

    console.log('responseData: ', responseData);

    return HttpResponse.json(responseData);
  }),
  // 프로필 유저 정보 데이터
  http.get('/api/users/:userId/feed', () => {
    console.log('profileUserData: ', profileUserData);
    return HttpResponse.json(profileUserData);
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

  http.get('/api/users/userInfo', () => {
    return HttpResponse.json({
      success: true,
      message: '요청에 성공했습니다.',
      results: {
        height: 170,
        weight: 60,
        constitution: 'heatSensitive',
        style: ['Minimal', 'Street'],
        gender: 'M',
      },
    });
  }),
  http.post('/api/posts', (request) => {
    return HttpResponse.json(
      {
        success: true,
        message: '요청에 성공했습니다.',
        results: null,
      },
      {
        status: 200,
      },
    );
  }),
];
