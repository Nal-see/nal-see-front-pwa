import { http, HttpResponse } from 'msw';
import { extractQueryParam } from '@/features/Feed/utils/RegExp';
import comments from 'mocks/data/commentData';
import { FeedDataList } from 'mocks/data/feedData';
import { profileFeedData, profileUserData } from './data/profileFeedData';

export const handlers = [
  http.get('/api/map/postList', async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return HttpResponse.json({
      success: true,
      message: '요청에 성공했습니다.',
      results: [
        {
          id: 2,
          pictureList: [
            'https://placehold.co/350x265',
            'https://placehold.co/350x265',
            'https://placehold.co/350x265',
          ],
          content:
            '오늘은 날씨가 좋네요. 햇살도 따뜻하고 바람도 시원해요. 산책하기 딱 좋은 날씨네요.',
          likeCnt: 0,
          isLiked: false,
          createDate: '2024-04-02T12:59:33.779119',
          address: '서울시 강동구',
          weather: 'Clouds',
          temperature: 24.1,
          userId: 10,
          username: '박길동',
          userImage: 'https://placeholder.co/50x50',
        },
        {
          id: 32,
          pictureList: [
            'https://placehold.co/350x265',
            'https://placehold.co/350x265',
            'https://placehold.co/350x265',
          ],
          content: '오늘은 덥네요. 더위 조심하세요!',
          likeCnt: 0,
          isLiked: false,
          createDate: '2024-04-02T12:59:33.785991',
          address: '서울시 강서구',
          weather: 'Clear',
          temperature: 15.4,
          userId: 5,
          username: '박철수',
          userImage: 'https://placeholder.co/50x50',
        },
        {
          id: 45,
          pictureList: [
            'https://placehold.co/350x265',
            'https://placehold.co/350x265',
            'https://placehold.co/350x265',
          ],
          content:
            '오늘 비도 많이오고 추워서 두틈하게 코트랑 우산챙겨서 나왔어요. 여러분도 비 맞지 않게 조심하세요!',
          likeCnt: 0,
          isLiked: false,
          createDate: '2024-04-02T12:59:33.794004',
          address: '서울시 중구',
          weather: 'Snow',
          temperature: 11,
          userId: 3,
          username: '김영희',
          userImage: 'https://placeholder.co/50x50',
        },
        {
          id: 54,
          pictureList: [
            'https://placehold.co/350x265',
            'https://placehold.co/350x265',
            'https://placehold.co/350x265',
          ],
          content: '오늘은 눈이 많이 오네요. 미끄럼 조심하세요.',
          likeCnt: 0,
          isLiked: false,
          createDate: '2024-04-02T12:59:33.799255',
          address: '서울시 용산구',
          weather: 'Clear',
          temperature: 19.5,
          userId: 2,
          username: '김철수',
          userImage: 'https://placeholder.co/50x50',
        },
        {
          id: 57,
          pictureList: [
            'https://placehold.co/350x265',
            'https://placehold.co/350x265',
            'https://placehold.co/350x265',
          ],
          content: '오늘은 눈이 많이 오네요. 미끄럼 조심하세요.',
          likeCnt: 0,
          isLiked: false,
          createDate: '2024-04-02T12:59:33.801208',
          address: '서울시 강서구',
          weather: 'Clouds',
          temperature: 3,
          userId: 7,
          username: '박영희',
          userImage: 'https://placeholder.co/50x50',
        },
      ],
    });
  }),
  http.get('/api/map', () => {
    return HttpResponse.json({
      success: true,
      message: '요청에 성공했습니다.',
      results: [
        {
          bottomLeftLat: 37.58223,
          bottomLeftLong: 126.948794,
          topRightLat: 14.8975,
          topRightLong: 28.785000000000004,
          picture: 'https://placehold.co/350x265',
          count: 1,
        },
        {
          bottomLeftLat: 37.588925,
          bottomLeftLong: 126.945073,
          topRightLat: 23.230000000000004,
          topRightLong: 23.230000000000004,
          picture: 'https://placehold.co/350x265',
          count: 10,
        },
        {
          bottomLeftLat: 37.5855783,
          bottomLeftLong: 126.947078,
          topRightLat: 26.0075,
          topRightLong: 23.230000000000004,
          picture: 'https://placehold.co/350x265',
          count: 6,
        },
      ],
    });
  }),
  http.get('/api/posts', (request) => {
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

    const parsedSize = 10;
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
  http.get('/api/posts/:postId', (request) => {
    const { postId } = request.params;
    const feed = FeedDataList.results.find((feed) => feed.id === postId);
    console.log('feed: ', feed);

    return HttpResponse.json(feed);
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
  http.get('/api/weather/current', () => {
    return HttpResponse.json({
      success: true,
      message: '요청에 성공했습니다.',
      results: {
        weather: 'Clouds',
        temperature: 31,
        feelsLike: 34.5,
        humidity: 59,
        pm10: 27.72,
        pm25: 23.89,
      },
    });
  }),
];
