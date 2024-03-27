import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://49.50.167.227:8080/api/',

});

export const getChatRoomLists = async () => {
  try {
    const response = await apiClient.get('/api/chat-room/my-list');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};