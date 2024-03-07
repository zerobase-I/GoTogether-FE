import axios from 'axios';

export const getChatRoomLists = async () => {
  try {
    const response = await axios.get('/api/chat-room/list');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};