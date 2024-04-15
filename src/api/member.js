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

//비밀번호 재설정

export const changePassword = async (email, newPassword, validationPassword) => {
  try {
    const response = await baseAxios.patch(`/member/changePwd/${email}`, {
      newPassword: newPassword,
      validationPassword: validationPassword,
    });
    console.log('API Response:', response);  // API 응답을 로깅합니다.
    return response.status === 200; // 성공 시 true 반환
  } catch (error) {
    console.error('Failed to change password:', error.response || error);
    throw error;
  }
};

// 이메일 인증 요청
export const requestEmailCertification = async (email) => {
  try {
    const response = await baseTokenAxios.post('/auth/mail/certification', { email });
    return response.data;
  } catch (error) {
    console.error('Email certification request failed:', error);
    throw error;
  }
};

// 이메일 코드 검증
export const verifyEmailCode = async (email, code) => {
  try {
    const response = await baseTokenAxios.post('/auth/mail/verify', { email, code });
    return response.data;
  } catch (error) {
    console.error('Email code verification failed:', error);
    throw error;
  }
};
