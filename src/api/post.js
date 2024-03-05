import axios from 'axios';

export const getPosts = async () => {
  try {
    const response = await axios.get('/api/post/list');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
