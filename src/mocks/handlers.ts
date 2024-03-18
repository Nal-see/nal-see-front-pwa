import { http, HttpResponse } from 'msw';

export const handlers = [
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
