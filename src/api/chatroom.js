import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://gotogether.site/api/',

});

// 채팅방 생성
export const createChatroom = async (postId) => {
  try {
    const response = await axios.post(`chat-room/${postId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 참여중인 채팅방 목록 조회
export const getChatRoomLists = async () => {
  try {
    const response = await apiClient.get('chat-room/my-list');
    console.log(response.data);
    // chatRoomDto 배열이 없거나 비어있는 경우 안전한 기본값 반환
    return response.data.chatRoomDto || [];
  } catch (error) {
    console.error(error);
    // 에러 발생 시 안전한 기본값 반환
    return [];
  }
};
// 채팅방 입장

// 채팅방 퇴장

// 채팅방 메시지 조회

// 참여자 목록 조회
