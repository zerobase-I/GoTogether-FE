import { baseAxios, baseTokenAxios } from '../components/config/api';

//나의 회원 정보 조회 -> get / 토큰
export const getMyMemberInfo = async () => {
  try {
    const response = await baseTokenAxios.get(`/member/myProfile`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 특정 회원 정보 조회 -> get
export const getOtherMemberInfo = async (memberId) => {
  try {
    const response = await baseAxios.get(
      `/member/profile?memberId=${memberId}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 나의 회원 정보 수정 -> put / 토큰

// 회원 탈퇴 -> patch / 토큰

// 알림 설정 조회 -> get / 토큰

// 알림 on/off  -> patch /토큰

// 평가 조회
export const getMyReviewInfo = async (memberId) => {
  try {
    const response = await baseAxios.get(`/member/assessment/${memberId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
