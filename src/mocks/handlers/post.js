import { http, HttpResponse, delay } from 'msw';
import postData from '../postDummy.json';

let Data = postData;
let postId = 4;

const getPostList = http.get('/api/post/list', async () => {
  let res = [...Data];

  await delay(1000);
  return HttpResponse.json(res);
});

const createPostList = http.post('/api/post', async ({ request }) => {
  const formData = await request.formData();

  //formData 객체에서 데이터 추출
  const newPost = {};
  for (const [key, value] of formData.entries()) {
    newPost[key] = value;
  }

  newPost.id = postId++;

  Data = [...Data, newPost];
  await delay(1000);
  console.log(Data);
  return HttpResponse.json(newPost, { status: 201 });
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
