import axios from 'axios';
import { accessToken } from '../components/config/api';

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
    const response = await apiClient.delete(`chat-room/exit/${chatRoomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log('Chat room exit successful:', response.data);
    return response.data; // 서버로부터 받은 응답 데이터를 반환합니다.
  } catch (error) {
    console.error('Chat room exit failed:', error.response ? error.response.data : error);
    throw error; // 오류를 호출 측에 전파
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

//참여자 목록 조회
export const getChatParticipantList = async (chatRoomId) => {
  try {
    const response = await apiClient.get(
      `chat-room/member-list/${chatRoomId}`,
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
