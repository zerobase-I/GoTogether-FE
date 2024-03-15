import axios from 'axios';

const API_BASE_URL = '/api'; // 백엔드 API의 기본 URL 설정

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signIn`, {
      email,
      password,
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 오류 발생 시 오류 객체를 그대로 throw
  }
};

export const getUserDetails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/member/myProfile`);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 오류 발생 시 오류 객체를 그대로 throw
  }
};
