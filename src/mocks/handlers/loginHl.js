import { http, HttpResponse, delay } from 'msw';
import { TokenAtom } from '/src/Recoil/TokenAtom.js';
import { useSetRecoilState } from 'recoil';

//////////////////////////////////////가상 계정으로 로그인/////////////////////////////////////////////////////////////

const virtualAccounts = [
  {
    id: 1,
    email: 'zerobase@naver.com',
    password: 'password1234',
  }
];

// 로그인 핸들러에 가상 계정 정보 추가

const postVirtualLoginHandler = http.post('/api/auth/signIn', (req, res, ctx) => {
  const { email, password } = req.body;
  console.log(`Received login request with email: ${email}, password: ${password}`); // 디버깅 메시지 추가

  const account = virtualAccounts.find(acc => acc.email === email && acc.password === password);

  if (account) {
    return res(ctx.status(200), ctx.json({ accessToken: 'mockAccessToken' }));
  } else {
    return res(ctx.status(401), ctx.json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }));
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


const postLoginHandler = http.post('/api/auth/signIn', async ({ request }) => {
  const { email, password, token } = await request.json();
  const newPost = {
    email: email, // 올바른 변수를 사용하여 초기화
    password: password,
    token: token// 올바른 변수를 사용하여 초기화
  };

  Data = [...Data, newPost];
  await delay(1000);
  return HttpResponse.json(newPost);
});

const loginLeftArrowHandlers = http.get('/src/assets/left-arrow.png', (req, res, ctx) => {
  return res(
    ctx.set('Content-Type', 'image/png'),
    ctx.status(200),
    ctx.body(/* 이미지 바이너리 데이터 */)
  );
});

const getIndexCSS = http.get('/src/index.css', async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.text('/* CSS 코드 */')
  );
});



export const loginPageHandlers = [postLoginHandler,postVirtualLoginHandler];
export const additionalLoginHandlersler = [loginLeftArrowHandlers, getIndexCSS];