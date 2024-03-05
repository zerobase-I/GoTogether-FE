import { http, HttpResponse, delay } from 'msw';
import postData from '../postDummy.json';

/* 
req 는 흔히 말하는 '요청'에 관한 역할을 처리한다.
res 는 응답을 리턴할 때 쓰이는 함수라고 볼 수 있다.
ctx 는 실제로 응답을 어떻게 처리할지 세세한 내용을 정해줄 수 있다.
*/

/* const getMatchingList = http.get('/api/matching/list', async ({ request }) => {
  let res = [...matchingList];
  const url = new URL(request.url);
  const date = url.searchParams.get('date');

  date && (res = res.filter((matching) => matching.matchingDate === date));

  await delay(1000);
  return HttpResponse.json(res);
}); */

let Data = postData;

const getPostList = http.get('/api/post/list', async () => {
  let res = [...Data];
  /*   const url = new URL(request.url);
  const date = url.searchParams.get('date');

  date && (res = res.filter((matching) => matching.matchingDate === date)); */

  await delay(1000);
  return HttpResponse.json(res);
});

const postPostList = http.post('/api/post', async ({ request }) => {
  const body = await request.json();
  const newPost = {
    travelCountry: '한국',
    travelCity: '서울',
    startDate: '23-03-05',
    finishDate: '23-03-07',
    gender: '동성',
    minimumAge: '21',
    maximumAge: '23',
    recruitsPeople: '7',
    estimatedTravelExpense: '80000',
    category: '여행',
    title: '서울맛집',
    content: '내용입니다아아아아ㅏㅇ',
    image: [
      {
        imageId: 1,
      },
      {
        imageId: 2,
      },
      ...body,
    ],
  };

  Data = [...postData, newPost];
  await delay(1000);
  return HttpResponse.json(newPost);
});

export const postHandlers = [getPostList, postPostList];
