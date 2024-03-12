import { atom, selector } from 'recoil';

export const TokenAtom = atom({
  key: "TokenAtom",
  default: null,
});

// 로그인 상태 확인을 위한 셀렉터
export const isLoggedInSelector = selector({
  key: 'isLoggedInSelector',
  get: ({ get }) => {
    const token = get(TokenAtom);
    return token !== null; // 토큰이 null이 아니면 로그인 상태로 간주
  },
});