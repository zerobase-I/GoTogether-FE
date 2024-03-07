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

const createPostList = http.post('/api/post', async ({ request }) => {
  const requestBody = await request.formData();
  const newPost = {
    ...requestBody,
  };

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
