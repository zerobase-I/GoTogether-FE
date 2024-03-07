import { http, HttpResponse, delay } from 'msw';


//////////////////////////////////////가상 계정으로 로그인/////////////////////////////////////////////////////////////

const virtualAccounts = [
  {
    id: 1,
    email: 'zerobase@naver.com',
    password: 'password1234'
  }
];

// 로그인 핸들러에 가상 계정 정보 추가
const getVirtualLoginHandler = http.get('/api/auth/signIn', async (req, res, ctx) => {
  await delay(1000); // 가상의 지연 추가
  return res(ctx.json(virtualAccounts)); // 가상의 계정 정보를 반환
});

const postVirtualLoginHandler = http.post('/api/auth/signIn', async ({ request }) => {
  const { email, password } = await request.json();
  const account = virtualAccounts.find(acc => acc.email === email && acc.password === password);

  if (account) {
    // 로그인 성공 시 필요한 동작
    return HttpResponse.ok({ message: '로그인 성공' });
  } else {
    // 로그인 실패 시 필요한 동작
    return HttpResponse.unauthorized({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
  }
});



//////////////////////////////////////Login.jsx와 MSW 연결////////////////////////////////////////////////////////////////


const loginPageImage = [
  {
    id: 1,
    "imageUrls": [
      "/src/assets/left-arrow.png"
    ]
  }
];

let Data = loginPageImage;


const getLoginHandler = http.get('/api/auth/signIn', async () => {
  let res = [...Data];

  await delay(1000);
  return HttpResponse.json(res);
});

const postLoginHandler = http.post('/api/auth/signIn', async ({ request }) => {
  const { email, password } = await request.json();
  const newPost = {
    email: email, // 올바른 변수를 사용하여 초기화
    password: password // 올바른 변수를 사용하여 초기화
  };

  Data = [...Data, newPost];
  await delay(1000);
  return HttpResponse.json(newPost);
});

const loginLeftArrowHandlers = http.get('/src/assets/left-arrow.png', (req, res, ctx) => {
  // 로고 이미지를 제공하는 핸들러
});

const getIndexCSS = http.get('/src/index.css', async (req, res, ctx) => {
  // 여기에 응답을 구성할 수 있습니다.
  // 현재는 간단히 빈 응답을 반환합니다.
});


const getLoginJSX = http.get('/src/pages/Login.jsx', async (req, res, ctx) => {
  // 여기에 응답을 구성할 수 있습니다.
  // 현재는 간단히 빈 응답을 반환합니다.
});

export const loginPageHandlers = [getLoginHandler,postLoginHandler,getVirtualLoginHandler,postVirtualLoginHandler];
export const additionalLoginHandlers = [loginLeftArrowHandlers, getIndexCSS, getLoginJSX];