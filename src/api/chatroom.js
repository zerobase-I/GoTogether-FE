import axios from 'axios';

// 채팅방 생성
export const createChatroom = async (postId) => {
  try {
    const response = await axios.post(`/api/chat-room/${postId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 참여중인 채팅방 목록 조회

// 채팅방 입장

// 채팅방 퇴장

// 채팅방 메시지 조회

// 참여자 목록 조회
