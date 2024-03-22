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

//  보낸 동행 요청 리스트 얻기
const getRequestList = http.get('/api/accompany/request/send', async () => {
  let res = [...requestList];

  await delay(200);
  return HttpResponse.json(res);
});

// 동행 요청 보내기
/* const postAccompanyRequest = http.post('/api/accompany/request/send', async ({request}) => {
  const
}) */

// 동행 취소요청 보내기

export const accompanyHandlers = [getRequestList];
