import { http, HttpResponse } from 'msw';
import { extractQueryParam } from '@/features/Feed/utils/RegExp';
import comments from 'mocks/data/commentData';
import { FeedDataList } from 'mocks/data/feedData';
import { profileFeedData, profileUserData } from './data/profileFeedData';

export const handlers = [
  http.get('/api/posts/location', ({ request }) => {
    console.log('request', request.url);
    return HttpResponse.json({
      success: true,
      message: '요청에 성공했습니다.',
      results: [
        {
          postResponseDto: {
            id: 4,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content: '오늘은 덥네요. 더위 조심하세요!',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.475891',
            address: '서울시 동작구',
            weather: 'Clear',
            temperature: 18.2,
            userId: 7,
            username: '박영희',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 35.29,
          longitude: 20.6,
        },
        {
          postResponseDto: {
            id: 9,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content:
              '오늘은 날씨가 좋네요. 햇살도 따뜻하고 바람도 시원해요. 산책하기 딱 좋은 날씨네요.',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.480295',
            address: '서울시 동대문구',
            weather: 'Thunderstorm',
            temperature: 22.9,
            userId: 2,
            username: '김철수',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 12.91,
          longitude: 37.04,
        },
        {
          postResponseDto: {
            id: 13,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content: '오늘은 눈이 많이 오네요. 미끄럼 조심하세요.',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.483341',
            address: '서울시 강서구',
            weather: 'Fog',
            temperature: 2,
            userId: 7,
            username: '박영희',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 31.39,
          longitude: 32.32,
        },
        {
          postResponseDto: {
            id: 20,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content: '오늘은 덥네요. 더위 조심하세요!',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.487991',
            address: '서울시 성동구',
            weather: 'Snow',
            temperature: 25.1,
            userId: 4,
            username: '이영희',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 25.77,
          longitude: 35.77,
        },
        {
          postResponseDto: {
            id: 21,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content:
              '오늘 비도 많이오고 추워서 두틈하게 코트랑 우산챙겨서 나왔어요. 여러분도 비 맞지 않게 조심하세요!',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.488619',
            address: '서울시 동대문구',
            weather: 'Snow',
            temperature: 23.1,
            userId: 5,
            username: '박철수',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 29.8,
          longitude: 36.74,
        },
        {
          postResponseDto: {
            id: 30,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content: '오늘은 바람이 많이 불어요. 모자 꼭 쓰고 다니세요.',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.494589',
            address: '서울시 성동구',
            weather: 'Snow',
            temperature: 8.7,
            userId: 6,
            username: '이철수',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 21.61,
          longitude: 43.17,
        },
        {
          postResponseDto: {
            id: 31,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content: '오늘은 눈이 많이 오네요. 미끄럼 조심하세요.',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.495168',
            address: '서울시 동대문구',
            weather: 'Clouds',
            temperature: 13.2,
            userId: 1,
            username: '홍길동',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 40.88,
          longitude: 42.07,
        },
        {
          postResponseDto: {
            id: 40,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content: '오늘은 눈이 많이 오네요. 미끄럼 조심하세요.',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.500604',
            address: '서울시 강북구',
            weather: 'Clear',
            temperature: 17.1,
            userId: 10,
            username: '박길동',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 24.49,
          longitude: 31.13,
        },
        {
          postResponseDto: {
            id: 46,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content: '오늘은 눈이 많이 오네요. 미끄럼 조심하세요.',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.504409',
            address: '서울시 성동구',
            weather: 'Clear',
            temperature: 29.6,
            userId: 4,
            username: '이영희',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 24.3,
          longitude: 26.97,
        },
        {
          postResponseDto: {
            id: 73,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content: '오늘은 추워요. 따뜻하게 입고 나가세요.',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.520314',
            address: '서울시 강서구',
            weather: 'Thunderstorm',
            temperature: 25.5,
            userId: 5,
            username: '박철수',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 27.83,
          longitude: 13.2,
        },
        {
          postResponseDto: {
            id: 74,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content:
              '오늘 비도 많이오고 추워서 두틈하게 코트랑 우산챙겨서 나왔어요. 여러분도 비 맞지 않게 조심하세요!',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.520807',
            address: '서울시 강동구',
            weather: 'Clear',
            temperature: 15.2,
            userId: 7,
            username: '박영희',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 43.81,
          longitude: 45.36,
        },
        {
          postResponseDto: {
            id: 75,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content:
              '오늘은 날씨가 좋네요. 햇살도 따뜻하고 바람도 시원해요. 산책하기 딱 좋은 날씨네요.',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.521318',
            address: '서울시 동작구',
            weather: 'Snow',
            temperature: 3.3,
            userId: 6,
            username: '이철수',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 39.02,
          longitude: 28.94,
        },
        {
          postResponseDto: {
            id: 78,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content: '오늘은 덥네요. 더위 조심하세요!',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.52312',
            address: '서울시 강서구',
            weather: 'Clear',
            temperature: 14.9,
            userId: 6,
            username: '이철수',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 17.72,
          longitude: 14,
        },
        {
          postResponseDto: {
            id: 97,
            pictureList: [
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
              'https://placehold.co/350x265',
            ],
            content: '오늘은 덥네요. 더위 조심하세요!',
            likeCnt: 0,
            isLiked: false,
            createDate: '2024-04-01T10:55:40.533391',
            address: '서울시 중구',
            weather: 'Snow',
            temperature: 4.7,
            userId: 6,
            username: '이철수',
            userImage: 'https://placeholder.co/50x50',
          },
          latitude: 25.82,
          longitude: 22.22,
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
];
