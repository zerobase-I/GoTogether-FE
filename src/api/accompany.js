import axios from 'axios';

// 내가 보낸 동행 요청 목록
export const getRequestList = async () => {
  try {
    const response = await axios.get('/api/accompany/request/send');

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//동행 요청 보내기
export const postAccompany = async (id, memberId) => {
  try {
    await axios.post('/api/accompany/request/send', {
      postId: id,
      requestedMEmberId: memberId,
    });

    return;
  } catch (error) {
    console.error(error);
  }
};

//동행 요청 취소하기
export const postCancelAccompany = async (requestId) => {
  try {
    await axios.post('/api/accompany/request/cancel', {
      id: requestId,
    });
  } catch (error) {
    console.error(error);
  }
};
