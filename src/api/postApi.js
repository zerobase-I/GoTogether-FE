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

export const createPost = async (inputValue) => {
  try {
    // 서버에 데이터를 보내는 비동기 작업 수행
    const response = await axios.post('/api/post', inputValue);
    console.log(response);
    return response.data; // 성공 시 반환할 데이터
  } catch (error) {
    throw new Error('게시글 작성 실패'); // 실패 시 에러 처리
  }
};

export const EditPost = async (inputValue) => {
  try {
    const response = await axios.put('/api/post/:id', inputValue);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};
