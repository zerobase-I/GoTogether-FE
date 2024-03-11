import { http, HttpResponse, delay } from 'msw';
import postData from '../postDummy.json';

let allPosts = postData;
let postId = 3;

const getPostList = http.get('/api/post/list', async () => {
  let res = [...allPosts];

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

  allPosts = [...allPosts, newPost];
  await delay(1000);

  return HttpResponse.json(newPost, { status: 201 });
});

const putPostList = http.put('/api/post/:id', async ({ request, params }) => {
  const formData = await request.formData();
  const { id } = params;

  const newPost = {};
  for (const [key, value] of formData.entries()) {
    newPost[key] = value;
  }

  allPosts[id] = newPost;
  allPosts[id].id = +id;

  console.log(allPosts);
  await delay(1000);
  return HttpResponse.json(newPost, { status: 201 });
});

const deletePostList = http.delete('/api/post/:id', async ({ params }) => {
  const { id } = params;

  console.log(id);

  const deletedPost = allPosts.find((item) => item.id === +id);

  if (!deletedPost) {
    return new HttpResponse(null, { status: 404 });
  }

  const newPost = allPosts.filter((post) => post.id !== +id);
  console.log(newPost);

  allPosts = [...newPost];

  await delay(1000);

  return HttpResponse.json(deletedPost);
});

export const postHandlers = [
  getPostList,
  createPostList,
  putPostList,
  deletePostList,
];
