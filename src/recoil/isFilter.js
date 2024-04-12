import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const isFilter = atom({
  key: 'filterOnOff',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
