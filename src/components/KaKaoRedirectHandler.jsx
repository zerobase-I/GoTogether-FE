import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getKakaoUserInfo } from '/src/api/kakaoAuthAPI';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      getKakaoUserInfo(code).then((userInfo) => {
        // navigate 함수의 두 번째 인자로 state를 전달하여 추가 정보 입력 페이지로 userInfo를 넘겨줍니다.
        navigate('/member/kakaoSignup', { state: { userInfo } });
      }).catch((error) => {
        console.error('카카오 로그인 처리 중 오류 발생:', error);
          navigate('/member');
      });
    }
  }, [navigate]);

 return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};


export default KakaoRedirectHandler;