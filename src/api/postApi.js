import axios from 'axios';

const BASE_URL = `http://49.50.167.227:8080/api`;

export const getPosts = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/post/searchAll?page=${page}&size=${size}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostDetail = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/post/${postId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/* export const createPost = async (inputValue) => {
  const { formData, ACCESSTOKEN } = inputValue;
  console.log(formData);
  console.log(ACCESSTOKEN.accessToken);

  const newPost = {};
  for (const [key, value] of inputValue.entries()) {
    newPost[key] = value;
  }
  console.log(newPost);

  try {
    // 서버에 데이터를 보내는 비동기 작업 수행
    const response = await axios.post(`${BASE_URL}/post`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${ACCESSTOKEN.accessToken}`,
        data: { formData: formData },
      },
    });
    console.log(response);
    return response.data; // 성공 시 반환할 데이터
  } catch (error) {
    throw new Error('게시글 작성 실패'); // 실패 시 에러 처리
  }
}; */
export const createPost = async (inputValue) => {
  try {
    // 서버에 데이터를 보내는 비동기 작업 수행
    const response = await axios.post(`${BASE_URL}/post`, inputValue);
    console.log(response);
    return response.data; // 성공 시 반환할 데이터
  } catch (error) {
    throw new Error('게시글 작성 실패'); // 실패 시 에러 처리
  }
};

export const updatePost = async (inputValue) => {
  const { inputs, postId } = inputValue;

  try {
    const response = await axios.put(`${BASE_URL}/post/${postId}`, inputs);

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/post/${postId}`);

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};
