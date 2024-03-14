import { atom, selector } from 'recoil';

export const TokenAtom = atom({
  key: 'TokenAtom',
  /*   default: null, */
  default: 'test후 이 코드 제거 위 코드 사용',
});

// 로그인 상태 확인을 위한 셀렉터
export const isLoggedInSelector = selector({
  key: 'isLoggedInSelector',
  get: ({ get }) => {
    const token = get(TokenAtom);
    return token !== null; // 토큰이 null이 아니면 로그인 상태로 간주
  },
});
