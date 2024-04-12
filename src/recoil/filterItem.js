import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const filterItem = atom({
  key: 'filterItem',
  default: {
    travelCountry: 'KOREA',
    travelCity: 'SEOUL',
    startDate: '',
    endDate: '',
    postGenderType: '',
    postCategory: '',
  },
  effects_UNSTABLE: [persistAtom],
});
