import axios from 'axios';

// 내가 보낸 동행 요청 목록
export const getRequestList = async () => {
  try {
    const response = await axios.get(
      'http://49.50.167.227:8080/api/accompany/request/send',
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//내가 받은 동행 요청 목록
export const getReceiveRequestList = async () => {
  try {
    const response = await axios.get(
      'http://49.50.167.227:8080/api/accompany/request/receive',
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//게시글에서 동행요청 보내기
export const postAccompanyRequest = async (id, memberId) => {
  try {
    await axios.post('http://49.50.167.227:8080/api/accompany/request/send', {
      postId: id,
      requestedMEmberId: memberId,
    });

    return;
  } catch (error) {
    console.error(error);
  }
};

//게시글에서 보낸 동행요청 취소하기
export const postAccompanyCancel = async (requestId) => {
  try {
    await axios.post('http://49.50.167.227:8080/api/accompany/request/cancel', {
      id: requestId,
    });
  } catch (error) {
    console.error(error);
  }
};

//동행 요청 승인하기
export const postApproveAccompany = async (requestId) => {
  try {
    await axios.post(
      `http://49.50.167.227:8080/api/accompany/request/approve/${requestId}`,
    );
  } catch (error) {
    console.error(error);
  }
};

//동행 요청 거절하기
export const postRejectAccompany = async (requestId) => {
  try {
    await axios.post(
      `http://49.50.167.227:8080/api/accompany/request/reject/${requestId}`,
    );
  } catch (error) {
    console.error(error);
  }
};
