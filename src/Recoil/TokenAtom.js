import { atom } from 'recoil';

export const TokenAtom = atom({
  key: 'TokenAtom',
  default: { accessToken: null }, // 사용자 상세 정보를 제거합니다.
});