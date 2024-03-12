import { http, HttpResponse, delay } from 'msw';

const firstPageImage = [
  {
    id: 1,
    "imageUrls": [
      "/src/assets/GoTogetherLogo.png"
    ],
    id: 2,
    "imageUrls": [
      "/src/assets/같이가요Login.png"
    ]

  }
];

let Data = firstPageImage;


const getAuthHandler = http.get('/api/auth', async () => {
  let res = [...Data];

  await delay(1000);
  return HttpResponse.json(res);
});

const postAuthHandler = http.post('/api/auth', async ({ request }) => {
  const body = await request.json();
  const newPost = {
    imageUrls: newPost.imageUrls
};

  Data = [...Data, newPost];
  await delay(1000);
  return HttpResponse.json(newPost);
});

const authStyleLogoHandlers = http.get('/src/assets/GoTogetherLogo.png', (req, res, ctx) => {
  // 로고 이미지를 제공하는 핸들러
});

const authStyleBgHandlers = http.get('/src/assets/AuthBackGround.jpg', (req, res, ctx) => {
  // 배경 이미지를 제공하는 핸들러
});

const getIndexCSS = http.get('/src/index.css', async (req, res, ctx) => {
  // 여기에 응답을 구성할 수 있습니다.
  // 현재는 간단히 빈 응답을 반환합니다.
});


const getAuthJSX = http.get('/src/pages/Auth.jsx', async (req, res, ctx) => {
  // 여기에 응답을 구성할 수 있습니다.
  // 현재는 간단히 빈 응답을 반환합니다.
});

export const authPageHandlers = [getAuthHandler,postAuthHandler];
export const additionalauthPageHandlers = [authStyleLogoHandlers, authStyleBgHandlers, getIndexCSS, getAuthJSX];