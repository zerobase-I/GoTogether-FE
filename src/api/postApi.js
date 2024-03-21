import axios from 'axios';

const BASE_URL = `http://49.50.167.227:8080/api`;

/* const ACCESSTOKEN = localStorage.getItem('accessToken');
console.log(ACCESSTOKEN); */

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

export const createPost = async (formData) => {
  const accessToken = localStorage.getItem('accessToken');

  const form = new FormData();
  const requestData = {};

  for (const [key, value] of formData.entries()) {
    requestData[key] = value;
  }
  form.append('request', JSON.stringify(requestData));

  // 토큰이 존재하는지 확인하고 없다면 에러 처리
  if (!accessToken) {
    throw new Error(
      '사용자가 로그인되어 있지 않습니다. 로그인 후 다시 시도해주세요.',
    );
  }
  try {
    // 서버에 데이터를 보내는 비동기 작업 수행
    const response = await axios.post(`${BASE_URL}/post`, form, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: '*/*',
      },
    });
    console.log(response);
    return response.data; // 성공 시 반환할 데이터
  } catch (error) {
    // 토큰이 만료되었거나 다른 이유로 요청이 실패한 경우
    if (error.response && error.response.status === 401) {
      throw new Error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
    } else {
      throw new Error('게시글 작성 실패'); // 실패 시 에러 처리
    }
  }
};
/* export const createPost = async (inputValue) => {
  try {
    // 서버에 데이터를 보내는 비동기 작업 수행
    const response = await axios.post(`${BASE_URL}/post`, inputValue);
    console.log(response);
    return response.data; // 성공 시 반환할 데이터
  } catch (error) {
    throw new Error('게시글 작성 실패'); // 실패 시 에러 처리
  }
}; */

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
