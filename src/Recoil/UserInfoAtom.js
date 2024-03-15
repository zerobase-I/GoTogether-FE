import { atom } from 'recoil';

export const UserInfoAtom = atom({
  key: 'userInfo', // 고유한 key로 수정
  default: {}, // 초기값은 빈 객체로 설정
});