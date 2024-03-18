import { http, HttpResponse, delay } from 'msw';

//////////////////////////////////////가상 계정으로 로그인/////////////////////////////////////////////////////////////

const virtualAccounts = [
  {
    id: 1,
    email: 'zerobase@naver.com',
    password: 'password1234',
  },
];

// 로그인 핸들러에 가상 계정 정보 추가

const postVirtualLoginHandler = http.post(
  '/api/auth/signIn',
  async ({ request }) => {
    // req.json() 대신 req.body에서 직접 데이터를 구조 분해 할당
    const { email, password } = await request.json();

    const account = virtualAccounts.find(
      (acc) => acc.email === email && acc.password === password,
    );

    if (account) {
      // 올바르게 accessToken 포함하여 응답 반환
      return HttpResponse.json({ accessToken: 'mockAccessToken' }, 200);
    } else {
      // 에러 메시지와 함께 응답 반환
      return HttpResponse.json(
        { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        401,
      );
    }
  },
);

const getUserDetailsHandler = http.get(
  '/api/member/myProfile',
  (req, res, ctx) => {
    const userDetails = {
      email: 'zerobase@naver.com',
      password: 'password1234',
      name: '제베스',
      nickname: '제로베',
      address: '제로시 제로구 제로동',
      phoneNumber: '010-1234-5678',
      age: 25,
      gender: 'MAN',
      MBTI: 'INFP',
      instagramId: 'zerobase_123',
      profileImageUrl:
        'data:image/jpeg;base64,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',
      description: 'hello world',
      travelScore: 50,
    };

    return HttpResponse.json(userDetails, 200); // 사용자 상세 정보와 상태 코드를 사용하여 응답 생성
  },
);

//////////////////////////////////////Login.jsx와 MSW 연결////////////////////////////////////////////////////////////////

const loginLeftArrowHandlers = http.get(
  '/src/assets/left-arrow.png',
  (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'image/png'),
      ctx.status(200),
      ctx.body(/* 이미지 바이너리 데이터 */),
    );
  },
);

const getIndexCSS = http.get('/src/index.css', async (req, res, ctx) => {
  return res(ctx.status(200), ctx.text('/* CSS 코드 */'));
});

export const loginPageHandlers = [
  postVirtualLoginHandler,
  getUserDetailsHandler,
];
export const additionalLoginHandlersler = [loginLeftArrowHandlers, getIndexCSS];
