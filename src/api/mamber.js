import axios from 'axios';

const BASE_URL = `https://gotogether.site/api`;

//나의 회원 정보 조회 -> get / 토큰
export const getMyMemberInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.get(`${BASE_URL}/member/myProfile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 특정 회원 정보 조회 -> get
export const getOtherMemberInfo = async (memberId) => {
  try {
    const response = await axios.get(`${BASE_URL}/member/profile/${memberId}`);

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
    const response = await axios.get(
      `${BASE_URL}/member/assessment/${memberId}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
