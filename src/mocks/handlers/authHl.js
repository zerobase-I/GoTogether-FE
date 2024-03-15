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


////////////////////////////////////////////////회원가입 핸들러//////////////////////////////////////////////////////
const checkEmailDuplicateHandler = http.post('/api/check-email', async ({ request }) => {
  const { email } = await request.json();
  // 여기서 이메일 중복 여부를 검사하는 로직을 구현합니다.
  // 예시로, 항상 중복되지 않음을 응답합니다.
  await delay(1000);
  return HttpResponse.json({ isDuplicate: false });
});

// 이메일 인증 코드 발송 핸들러
const sendEmailVerificationCodeHandler = http.post('/api/send-verification-code', async ({ request }) => {
  const { email } = await request.json();
  // 인증 코드를 발송하는 로직을 모의합니다.
  // 예시로, 인증 코드 '123456'을 발송했다고 응답합니다.
  await delay(1000);
  return HttpResponse.json({ code: '123456' });
});

// 회원가입 요청 핸들러
const signUpHandler = http.post('/api/signup', async ({ request }) => {
  const newUser = await request.json();
  // 회원가입 로직을 모의합니다.
  // 예시로, 사용자 정보를 그대로 반환하며, 회원가입이 성공했다고 가정합니다.
  await delay(1000);
  return HttpResponse.json(newUser);
});



export const authPageHandlers = [getAuthHandler,postAuthHandler,checkEmailDuplicateHandler,sendEmailVerificationCodeHandler,signUpHandler];
export const additionalauthPageHandlers = [authStyleLogoHandlers, authStyleBgHandlers, getIndexCSS, getAuthJSX];