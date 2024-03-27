import axios from 'axios';

import { BASE_URL } from '../components/config/data';

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

export const getMyPosts = async (page = 0, size = 10, userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/post/myPosts/${userId}?page=${page}&size=${size}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostDetail = async (postId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/post/myPosts/${userId}?page=${page}&size=${size}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async (formData) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);
  const form = new FormData();
  const requestData = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      form.append(`files`, value);
    } else {
      // 비파일 값은 requestData 객체에 추가
      if (key !== 'image') {
        // 'image' 키를 제외한 모든 데이터를 처리
        requestData[key] = value;
      }
    }
  }

  console.log(requestData);
  console.log(form);

  const json = JSON.stringify(requestData);
  const blob = new Blob([json], { type: 'application/json' });
  form.append('request', blob);

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

export const updatePost = async (inputValue) => {
  const { formData, postId } = inputValue;

  const form = new FormData();
  const requestData = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      form.append(`files`, value);
    } else {
      // 비파일 값은 requestData 객체에 추가
      if (key !== 'image') {
        // 'image' 키를 제외한 모든 데이터를 처리
        requestData[key] = value;
      }
    }
  }

  console.log(requestData);
  console.log(form);

  const json = JSON.stringify(requestData);
  const blob = new Blob([json], { type: 'application/json' });
  form.append('request', blob);

  try {
    const response = await axios.put(`${BASE_URL}/post/${postId}`, form);

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};

export const deletePost = async (postId) => {
  console.log(postId);
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(`${BASE_URL}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: '/',
      },
    });

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};
