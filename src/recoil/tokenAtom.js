import { atom } from 'recoil';

// 로컬 스토리지에서 토큰 정보를 로드하는 함수
const loadTokenInfoFromStorage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  // 만료 시간 정보도 로드하고 싶다면, localStorage에서 추가로 가져와야 합니다.
  // 여기에서는 간단히 accessToken과 refreshToken만 다룹니다.
  return {
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
    // accessTokenExpiredTime, refreshTokenExpiredTime 등의 기본값도 설정할 수 있습니다.
  };
};

export const TokenAtom = atom({
  key: 'TokenAtom',
  default: loadTokenInfoFromStorage(), // 초기값을 localStorage에서 받아옴
});