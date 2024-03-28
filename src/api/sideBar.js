import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://gotogether.site/api',
});

export const fetchPostDetails = async (postId) => {
  try {
    const response = await apiClient.get(`/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post details for post ${postId}:`, error);
    throw error;
  }
};

export const fetchChatRoomMemberList = async (accessToken, chatRoomId) => {
    try {
      apiClient.defaults.headers.common['Authorization'] =`Bearer ${accessToken}`;
    const response = await apiClient.get(`/chat-room/member-list/${chatRoomId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching chat room member list for room ${chatRoomId}:`, error);
    throw error;
  }
};

export const fetchMainSchedule = async (postId) => {
  try {
    const response = await apiClient.get(`/main-schedule/${postId}`);
    return response.data; // 메인 일정 목록을 반환
  } catch (error) {
    console.error('Failed to fetch main schedule:', error);
    throw error; // 오류를 상위 호출자에게 전파
  }
};