import { atom } from 'recoil';

// 로컬 스토리지에서 사용자 정보를 로드하는 함수
const loadUserInfoFromStorage = () => {
  const userInfoString = localStorage.getItem('userDetails');
  return userInfoString ? JSON.parse(userInfoString) : {};
};

export const UserInfoAtom = atom({
  key: 'userInfo',
  default: loadUserInfoFromStorage(), // 초기값을 localStorage에서 받아옴
});