import { atom } from 'recoil';

// 로컬 스토리지에서 카카오 사용자 정보를 로드하는 함수
const kakaoUserInfoFromStorage = () => {
  const userInfoString = localStorage.getItem('kakaoUserInfo');
  return userInfoString ? JSON.parse(userInfoString) : {};
};

export const KakaoUserState = atom({
  key: 'kakaoUserData',
  default: kakaoUserInfoFromStorage(), // 로컬 스토리지에서 가져온 값으로 초기값 설정
});