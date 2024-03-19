import axios from 'axios';

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: 'http://49.50.167.227:8080/api/',
});

// 로그인 요청 함수
export const signIn = async (email, password) => {
  try {
    const response = await apiClient.post('auth/signIn', {
      email,
      password,
    });
    console.log('로그인 요청 응답:', response.data); // 로그인 요청 응답 확인
    return response.data;
  } catch (error) {
    console.error('로그인 요청 중 오류:', error);
    throw error;
  }
};

// 사용자 정보 요청 함수
export const getUserDetails = async (accessToken) => {
  try {
    const response = await apiClient.get('member/myProfile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('사용자 정보 요청 응답:', response.data); // 사용자 정보 요청 응답 확인
    return response.data;
  } catch (error) {
    console.error('사용자 정보 요청 중 오류:', error);
    throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  }
};