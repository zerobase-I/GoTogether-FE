import { http, HttpResponse, delay } from 'msw';

//////////////////////////////////////가상 계정으로 로그인/////////////////////////////////////////////////////////////

const virtualAccounts = [
  {
    id: 1,
    email: 'zerobase@naver.com',
    password: 'password1234',
  }
];

// 로그인 핸들러에 가상 계정 정보 추가

const postVirtualLoginHandler = http.post('/api/auth/signIn', async({request}) => {
  // req.json() 대신 req.body에서 직접 데이터를 구조 분해 할당
  const { email, password } = await request.json();

  const account = virtualAccounts.find(acc => acc.email === email && acc.password === password);

  if (account) {
    // 올바르게 accessToken 포함하여 응답 반환
    return HttpResponse.json({ accessToken: 'mockAccessToken' }, 200);
    
  } else {
    // 에러 메시지와 함께 응답 반환
    return HttpResponse.json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' }, 401);
    
  }
});

const getUserDetailsHandler = http.get('/api/member/myProfile', (req, res, ctx) => {
  const userDetails = {
    email: "zerobase@naver.com",
    password: "password1234",
    name: "제베스",
    nickname: "제로베",
    address: "제로시 제로구 제로동",
    phoneNumber: "010-1234-5678",
    age: 25,
    gender: "MAN",
    MBTI: "INFP",
    instagramId: "zerobase_123",
    profileImageUrl: "asdf",
    description: "hello world",
    travelScore: 50
  };

  return HttpResponse.json(userDetails, 200); // 사용자 상세 정보와 상태 코드를 사용하여 응답 생성
});
 

//////////////////////////////////////Login.jsx와 MSW 연결////////////////////////////////////////////////////////////////


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



export const loginPageHandlers = [
  postVirtualLoginHandler,
  getUserDetailsHandler,
];
export const additionalLoginHandlersler = [loginLeftArrowHandlers, getIndexCSS];