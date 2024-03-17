import axios from 'axios';

export const getPosts = async () => {
  try {
    const response = await axios.get('/api/post/list');

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostDetail = async (postId) => {
  //console.log(postId); // 1
  try {
    const response = await axios.get(`/api/post/${postId}`);
    const data = response.data;

    return data;
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

export const updatePost = async (inputValue) => {
  const { inputs, postId } = inputValue;

  try {
    const response = await axios.put(`/api/post/${postId}`, inputs);

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`/api/post/${postId}`);

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};
