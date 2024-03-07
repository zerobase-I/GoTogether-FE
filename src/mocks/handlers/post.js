import { http, HttpResponse, delay } from 'msw';
import postData from '../postDummy.json';

/* 
req 는 흔히 말하는 '요청'에 관한 역할을 처리한다.
res 는 응답을 리턴할 때 쓰이는 함수라고 볼 수 있다.
ctx 는 실제로 응답을 어떻게 처리할지 세세한 내용을 정해줄 수 있다.
*/

let Data = postData;

const getPostList = http.get('/api/post/list', async () => {
  let res = [...Data];
  /*   const url = new URL(request.url);
  const date = url.searchParams.get('date');

  date && (res = res.filter((matching) => matching.matchingDate === date)); */

  await delay(1000);
  return HttpResponse.json(res);
});
let postId = 4;

const createPostList = http.post('/api/post', async ({ request }) => {
  const requestBody = await request.formData();

  const newPost = {
    id: postId,
    travelCountry: '일본',
    travelCity: '도쿄',
    startDate: '03-06-2024',
    finishDate: '03-08-2024',
    gender: '동일 성별',
    minimumAge: '18',
    maximumAge: '25',
    recruitsPeople: '8',
    estimatedTravelExpense: '30000',
    category: '전시회/공연',
    title: '여행을 떠나여',
    content: 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ',
    image:
      'https://i.namu.wiki/i/1L_8d7FSBchLDnx7zLaxWs-HvUa6wQzLy2trSu0fGIqjWYQDWjEIEyxxoNJyDaIq_FF1QKFsu8nMNpDbJn_QSQ.webp',
    ...requestBody,
  };

  postId++;
  Data = [...postData, newPost];
  await delay(1000);
  console.log(Data);
  return HttpResponse.json(newPost);
});

const createFile = http.post('/upload', async ({ request }) => {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return new HttpResponse('Missing document', { status: 400 });
  }

  if (!(file instanceof File)) {
    return new HttpResponse('Uploaded document is not a File', {
      status: 400,
    });
  }

  return HttpResponse.json({
    contents: await file.text(),
  });
});

export const postHandlers = [getPostList, createPostList, createFile];
