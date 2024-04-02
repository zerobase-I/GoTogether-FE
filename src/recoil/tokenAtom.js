import { atom } from 'recoil';

const loadTokenInfoFromStorage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
  };
};

export const TokenAtom = atom({
  key: 'TokenAtom',
  default: loadTokenInfoFromStorage(),
});