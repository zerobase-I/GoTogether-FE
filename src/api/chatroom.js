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
