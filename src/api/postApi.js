import axios from 'axios';

export const getPosts = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(
      `http://49.50.167.227:8080/api/post/searchAll?page=${page}&size=${size}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostDetail = async (postId) => {
  try {
    const response = await axios.get(
      `http://49.50.167.227:8080/api/post/${postId}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async (inputValue) => {
  try {
    // 서버에 데이터를 보내는 비동기 작업 수행
    const response = await axios.post(
      'http://49.50.167.227:8080/api/post',
      inputValue,
    );
    console.log(response);
    return response.data; // 성공 시 반환할 데이터
  } catch (error) {
    throw new Error('게시글 작성 실패'); // 실패 시 에러 처리
  }
};

export const updatePost = async (inputValue) => {
  const { inputs, postId } = inputValue;

  try {
    const response = await axios.put(
      `http://49.50.167.227:8080/api/post/${postId}`,
      inputs,
    );

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      `http://49.50.167.227:8080/api/post/${postId}`,
    );

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};
