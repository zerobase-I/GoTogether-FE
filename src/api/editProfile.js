import axios from 'axios';

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: 'https://gotogether.site/api',
});

export const updateMyProfile = async (accessToken, formData) => {
  try {
    const response = await apiClient.put('/member/myProfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 명시적으로 받은 accessToken을 Authorization 헤더에 추가합니다.
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log('프로필 업데이트 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('updateMyProfile 에러:', error.response?.data);
    throw error;
  }
};