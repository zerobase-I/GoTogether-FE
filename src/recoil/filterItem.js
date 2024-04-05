import { atom } from 'recoil';

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
});
