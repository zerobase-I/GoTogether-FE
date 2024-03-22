import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getKakaoUserInfo } from '/src/api/kakaoAuthAPI';
import { useSetRecoilState } from 'recoil';
import { KakaoUserState } from '/src/recoil/kakaoUser.js';

const Callback = () => {
  const navigate = useNavigate();
  const setKakaoUser = useSetRecoilState(KakaoUserState);
  const code = new URLSearchParams(window.location.search).get('code');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await getKakaoUserInfo(code);

        // response에서 직접 사용자 정보를 받았다면, 신규 사용자로 간주
        if (response && response.email) {
          // 신규 사용자 정보를 받아왔다면, 회원가입 페이지로 이동하면서 사용자 정보 전달
          navigate('/member/KakaoSignUp', {
            state: { userInfo: response, code: code },
          });
        } else if (response && response.accessToken) {
          // 기존 회원인 경우, 서버로부터 받은 액세스 토큰을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', response.accessToken);
          setKakaoUser(response);
          navigate('/');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error;

        if (errorMessage === 'DUPLICATE_USER') {
          // 이미 가입된 사용자일 경우 홈으로 리다이렉트
          navigate('/');
        } else if (errorMessage === 'USER_NOT_FOUND') {
          // 신규 사용자일 경우 회원가입 페이지로 리다이렉트
          navigate('/member/KakaoSignUp');
        } else {
          // 그 외 오류 발생 시 로그인 페이지로 리다이렉트
          console.error('Error verifying user:', error);
          navigate('/member/login');
        }
      }
    };

    verifyUser();
  }, [code, navigate]);

  return <div>로그인 상태 확인 중...</div>;
};

export default Callback;
