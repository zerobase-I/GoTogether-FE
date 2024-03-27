import axios from 'axios';
import { accessToken } from '../components/config/data';

const apiClient = axios.create({
  baseURL: 'https://gotogether.site/api/',
});

// 채팅방 생성
export const createChatroom = async (postId, accompanyRequestMemberId) => {
  try {
    const response = await apiClient.post(
      `chat-room`,
      { postId, accompanyRequestMemberId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 참여중인 채팅방 목록 조회
export const getChatRoomLists = async () => {
  try {
    const response = await apiClient.get('chat-room/my-list', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 채팅방 퇴장을 처리하는 함수
export const exitChatRoom = async (accessToken, chatRoomId) => {
  try {
    apiClient.defaults.headers.common['Authorization'] =
      `Bearer ${accessToken}`;

    const response = await apiClient.delete(`chat-room/exit/${chatRoomId}`, {});
    console.log(response.data);
    return response.data; // 서버로부터 받은 응답 데이터를 반환합니다.
  } catch (error) {
    console.error('Chat room entry failed:', error);
    throw error;
  }
};

// 채팅방 입장
export const enterChatRoom = async (chatRoomId, accompanyRequestMemberId) => {
  try {
    const response = await apiClient.post(
      `chat-room/enter`,
      { chatRoomId, accompanyRequestMemberId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 채팅방 퇴장

// 채팅방 메시지 조회
