import axios from 'axios';


// 게시글 목록을 가져오는 함수
export const fetchPostList = async () => {
  try {
    const response = await axios.get(`/api/post/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post list:', error);
    throw error;
  }
};

// 특정 채팅방의 참여자 목록을 가져오는 함수
export const fetchChatRoomMemberList = async (chatRoomId) => {
  try {
    const response = await axios.get(`/api/chat-room/member-list/${chatRoomId}`);
    return response.data.list; // 예시 응답이 { list: [] } 형태인 것을 가정
  } catch (error) {
    console.error(`Error fetching chat room member list for room ${chatRoomId}:`, error);
    throw error;
  }
};

// 대기자 목록을 가져오는 함수
export const fetchAccompanyRequest = async () => {
  try {
    const response = await axios.get(`/api/accompany/request/receive`);
    return response.data; // 예시 응답이 배열인 것을 가정
  } catch (error) {
    console.error('Error fetching accompany request list:', error);
    throw error;
  }
};