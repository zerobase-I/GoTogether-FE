import axios from 'axios';

const API_BASE_URL = 'http://49.50.167.227:8080/api';

// 카카오 회원가입을 위해 서버에 추가 정보를 전송하는 함수
export const signUpWithKakao = async (userInfo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/kakao/signUp`, userInfo);
    return response.data; // 회원가입 후 반환되는 토큰 정보 반환
  } catch (error) {
    console.error('카카오 회원가입 처리 중 오류 발생:', error);
    throw error;
  }
};
// 카카오 로그인 후 서버로부터 사용자 정보를 받아오는 함수
export const getKakaoUserInfo = async (code) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/redirected/kakao?code=${code}`);
    return response.data; // 사용자 정보 반환
  } catch (error) {
    console.error('카카오 로그인 처리 중 오류 발생:', error);
    throw error;
  }
};
