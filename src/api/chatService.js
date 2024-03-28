import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://gotogether.site/api/',

});

export const reissueToken = async (refreshToken) => {
  try {
    const response = await apiClient.post('auth/reissue', {
      refreshToken,
    });
    const { accessToken: newAccessToken } = response.data;
    localStorage.setItem('accessToken', newAccessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    return newAccessToken; // 새로 발급된 액세스 토큰을 반환합니다.
  } catch (error) {
    console.error('Token reissue failed:', error);
    throw error; // 오류를 상위 호출자에게 전파합니다.
  }
};

export const fetchChatMessages = async (accessToken, chatRoomId) => {
  try {
    // 토큰을 사용하여 요청의 Authorization 헤더 설정
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    // 서버로부터 채팅방 메시지 또는 정보를 가져오는 GET 요청
    const response = await apiClient.get(`chat-room/message/${chatRoomId}`);
    console.log("서버 응답: ", response.data); // 직접 응답 데이터를 로깅

    // 서버 응답이 배열인지 확인하고 반환
    if (Array.isArray(response.data)) {
      return response.data; // 직접 응답 배열을 반환
    } else {
      console.warn('Expected an array of chat messages in the server response, but got something else.', response.data);
      return []; // 예상한 배열이 아닐 경우 빈 배열 반환
    }
  } catch (error) {
    console.error('Failed to fetch chat messages:', error);
    throw error; // 오류 발생 시, 이를 상위 호출자에게 전파합니다.
  }
};