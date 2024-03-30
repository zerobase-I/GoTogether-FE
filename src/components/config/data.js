export const categoryList = [
  'FOOD_CAFE',
  'ALCOHOL_FRIENDSHIP',
  'ACTIVITY_TOUR',
  'EXHIBITION_PERFORMANCE',
  'ETC',
];
export const categoryLists = [
  { FOOD_CAFE: '맛집 / 카페' },
  { ALCOHOL_FRIENDSHIP: '음주 여행/ 술친구' },
  { ACTIVITY_TOUR: '활동적인 여행' },
  { EXHIBITION_PERFORMANCE: '전시회 /  공연' },
  { ETC: '기타' },
];

export const genders = [{ ALL: '모두' }, { MAN: '남자' }, { WOMAN: '여자' }];

export const accessToken = localStorage.getItem('accessToken');

export const BASE_URL = `https://gotogether.site/api`;
