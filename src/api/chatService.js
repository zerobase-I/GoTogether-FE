import axios from 'axios';

// 모의 백엔드 서버 주소
const MOCK_SERVER_BASE_URL = 'http://localhost:5173';

const api = axios.create({
  baseURL: MOCK_SERVER_BASE_URL,
});

// 채팅방 입장을 처리하는 함수
export const enterChatRoom = async (chatRoomId, memberId, nickname) => {
  try {
     const response = await api.post(`/api/chat-room/enter/${chatRoomId}`, {
      memberId,
      nickname,
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error('Chat room entry failed:', error);
    throw error; // 오류 발생 시, 오류를 던짐
  }
};

// 채팅방 퇴장을 처리하는 함수
export const exitChatRoom = async (chatRoomId, memberId, nickname) => {
  try {
    const response = await api.delete(`/api/chat-room/exit/${chatRoomId}`, {
      data: {
        memberId,
        nickname,
      },
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error('Chat room exit failed:', error);
    throw error; // 오류 발생 시, 오류를 던짐
  }
};