import { http, HttpResponse } from 'msw';
import { feedData } from '@/features/Feed/data/feedData';

export const handlers = [
  http.get('/feedList', () => {
    return HttpResponse.json(feedData);
  }),
];
