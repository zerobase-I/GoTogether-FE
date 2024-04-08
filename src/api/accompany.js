import { baseTokenAxios } from '../components/config/api';

// 내가 보낸 동행 요청 목록
export const getRequestAccompanyList = async () => {
  try {
    const response = await baseTokenAxios.get(`/accompany/request/send`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//내가 받은 동행 요청 목록
export const getReceiveAccompanyList = async () => {
  try {
    const response = await baseTokenAxios.get(`/accompany/request/receive`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//게시글에서 동행요청 보내기
export const postAccompanyRequest = async ({ postId, postAuthorId }) => {
  try {
    await baseTokenAxios.post(`/accompany/request/send/${postId}`, {
      postId: postId,
      requestedMemberId: postAuthorId,
    });

    return;
  } catch (error) {
    console.error(error);
  }
};

//게시글에서 보낸 동행요청 취소하기
export const postAccompanyCancel = async (requestId) => {
  console.log(`동행요청취소 requestId ${requestId}`);
  try {
    await baseTokenAxios.post(`/accompany/request/cancel/${requestId}`, {});
  } catch (error) {
    console.error(error);
  }
};

//travelrequestlist 페이지 - 동행 요청 승인하기
export const postApproveAccompany = async (requestListId) => {
  try {
    const response = await baseTokenAxios.post(
      `/accompany/request/approve/${requestListId}`,
      {},
    );

    // 채팅방 있을경우, 채팅방 번호 / 없을경우 null 또는 undefined
    const isChatroom = response.data.chatRomId;

    return isChatroom;
  } catch (error) {
    console.error(error);
  }
};

//
//travelrequestlist 페이지 - 동행 요청 거절하기
export const postRejectAccompany = async (requestListId) => {
  try {
    await baseTokenAxios.post(`/accompany/request/reject/${requestListId}`, {});
  } catch (error) {
    console.error(error);
  }
};

// 리뷰 대상 조회
export const getReviewerList = async (postId) => {
  console.log(postId);
  try {
    const response = await baseTokenAxios.get(`/accompany/review/${postId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 동행 후기 작성
export const writeCompanionReview = async (reviews) => {
  try {
    await baseTokenAxios.post(`/accompany/review/submit`, reviews);
  } catch (error) {
    console.error(error);
  }
};
