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

const putPostList = http.put('/api/post/:id', async ({ request, params }) => {
  const { id } = params;
  const newPost = await request.json();

  console.log('Updating post "%s" with:', id, newPost);
});

const deletePostList = http.delete('/api/post/:id', ({ params }) => {
  const { id } = params;
  console.log('Deleting user with ID "%s"', id);
});

export const postHandlers = [
  getPostList,
  createPostList,
  putPostList,
  deletePostList,
];
