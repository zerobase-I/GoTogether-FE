import { http, HttpResponse, delay } from 'msw';

const requestList = [
  {
    id: 1,
    requestedMemberId: 'C',
    requestStatus: 'WATING',
    createdAt: '2024-01-01T12:04:11',
  },
  {
    id: 2,
    requestedMemberId: 'D',
    requestStatus: 'WATING',
    createdAt: '2024-01-01T12:04:11',
  },
];

const getRequestList = http.get('/api/accompany/request/send', async () => {
  let res = [...requestList];

  await delay(200);
  return HttpResponse.json(res);
});

export const accompanyHandlers = [getRequestList];
