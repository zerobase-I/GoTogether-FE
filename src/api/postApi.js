import {
  accessToken,
  baseAxios,
  baseTokenAxios,
} from '../components/config/api';

//전체 게시물 리스트 조회 -> 페이지네이션 백엔드 구현
export const getPosts = async (page = 0, size = 10) => {
  try {
    const response = await baseAxios.get(
      `/post/searchAll?page=${page}&size=${size}`,
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 자신 또는 특정 회원이 작성한 게시물리스트 보기 -> 페이지네이션 백엔드 구현 -> 토큰
export const getMyPosts = async (userId, page = 0, size = 5, postId) => {
  try {
    const response = await baseTokenAxios.get(
      `/post/myPosts/${userId}?page=${page}&size=${size}&postId=`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 게시물 상세 정보 조회
export const getPostDetail = async (postId) => {
  try {
    const response = await baseAxios.get(`/post/myPosts/${postId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 게시물 생성 -> 토큰
export const createPost = async (formData) => {
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
    const response = await baseTokenAxios.post(`/post`, form, {});
    console.log(response);
    return response.data;
  } catch (error) {
    // 토큰이 만료되었거나 다른 이유로 요청이 실패한 경우
    if (error.response && error.response.status === 401) {
      throw new Error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
    } else {
      throw new Error('게시글 작성 실패');
    }
  }
};

//게시물 수정 -> 토큰
export const updatePost = async (inputValue) => {
  const { formData, postId } = inputValue;
  console.log(postId);

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
    const response = await baseTokenAxios.put(`/post/${postId}`, form);

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};

// 게시물 삭제 -> 토큰
export const deletePost = async (postId) => {
  console.log(postId);

  try {
    const response = await baseTokenAxios.delete(`/post/${postId}`);

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error('게시글 수정 실패');
  }
};

// 게시물 키워드 검색 조회 -> 토큰
//keyword  = { travelCountry, travelCity, startDate, endDate, postGenderType, postCategory }
export const getKeywordFilterPost = async (keyword, page = 0, size = 5) => {
  const filterKeyword = {}; // keyword 중 date를 제외한 keyword
  const dateKeyword = {}; // keyword 중 startDate,endDate keyword
  const filterList = {}; // 필터에 사용될 키워드 모음

  for (const [key, value] of Object.entries(keyword)) {
    if (key === 'startDate' || key === 'endDate') {
      dateKeyword[key] = value;
    } else {
      filterKeyword[key] = value;
    }
  }

  for (const [key, value] of Object.entries(filterKeyword)) {
    if (value !== '') {
      filterList[key] = value;
    }
  }

  const filterListLength = Object.keys(filterList).length; // 필터에 사용될 키워드 개수
  const dateListLength = Object.keys(dateKeyword).length; // date 길이가 0이 아니면 필터에 사용
  const filterValue = Object.values(filterList); // 필터 사용 데이터 배열로
  const filterDateValue = Object.values(dateKeyword); // 필터 사용 date 배열로
  let response; // 비동기 반환값

  try {
    //keyword 1개이면서 date 존재하는 경우
    if (filterListLength === 1 && dateListLength !== 0) {
      response = await baseTokenAxios.get(
        `/post/keyword?keyword=${filterValue[0]}&startDate=${filterDateValue[0]}&endDate=${filterDateValue[1]}&page=${page}&size=${size}`,
      );
    } else if (filterListLength === 1) {
      //keyword 1개 일 경우
      response = await baseTokenAxios.get(
        `/post/keyword?keyword=${filterValue[0]}&page=${page}&size=${size}`,
      );
    }

    //keyword 2개이면서 date 존재하는 경우
    if (filterListLength === 2 && dateListLength !== 0) {
      response = await baseTokenAxios.get(
        `/post/keyword?keyword=${filterValue[0]}&keyword=${filterValue[1]}&startDate=${filterDateValue[0]}&endDate=${filterDateValue[1]}&page=${page}&size=${size}`,
      );
    } else if (filterListLength === 2) {
      //keyword 2개 일 경우
      response = await baseTokenAxios.get(
        `/post/keyword?keyword=${filterValue[0]}&keyword=${filterValue[1]}&page=${page}&size=${size}`,
      );
    }

    //keyword 3개이면서 date 존재하는 경우
    if (filterListLength === 3 && dateListLength !== 0) {
      response = await baseTokenAxios.get(
        `/post/keyword?keyword=${filterValue[0]}&keyword=${filterValue[1]}&keyword=${filterValue[2]}&startDate=${filterDateValue[0]}&endDate=${filterDateValue[1]}&page=${page}&size=${size}`,
      );
    } else if (filterListLength === 3) {
      //keyword 3개 일 경우
      response = await baseTokenAxios.get(
        `/post/keyword?keyword=${filterValue[0]}&keyword=${filterValue[1]}&keyword=${filterValue[2]}&page=${page}&size=${size}`,
      );
    }

    //keyword 4개이면서 date 존재하는 경우
    if (filterListLength === 4 && dateListLength !== 0) {
      response = await baseTokenAxios.get(
        `/post/keyword?keyword=${filterValue[0]}&keyword=${filterValue[1]}&keyword=${filterValue[2]}&keyword=${filterValue[3]}&startDate=${filterDateValue[0]}&endDate=${filterDateValue[1]}&page=${page}&size=${size}`,
      );
    } else if (filterListLength === 4) {
      //keyword 4개 일 경우
      response = await baseTokenAxios.get(
        `/post/keyword?keyword=${Object.values(filterList)[0]}&keyword=${filterValue[1]}&keyword=${filterValue[2]}&keyword=${filterValue[3]}&page=${page}&size=${size}`,
      );
    }

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('게시글 키워드 검색 조회 실패');
  }
};

// 게시물 찜(스크랩) 하기 -> 토큰
export const getMyScrapPost = async (postId) => {
  try {
    await baseTokenAxios.post(`/post/scrap/${postId}`, {});
  } catch (error) {
    throw new Error('게시글 찜하기 에러발생');
  }
};

// 게시글 동행모집 마감 -> 토큰
export const postCompanionRecruitmentClosed = async (postId) => {
  try {
    await baseTokenAxios.put(`/recrument-end/${postId}`, {});
  } catch (error) {
    throw new Error('게시글 동행모집 마감 에러발생');
  }
};

//참여한 동행 리스트 -> 토큰
export const participantCompanionList = async (id) => {
  try {
    await baseTokenAxios.get(`/list/user/accompany/${id}`);
  } catch (error) {
    throw new Error('게시글 동행모집 마감 에러발생');
  }
};
