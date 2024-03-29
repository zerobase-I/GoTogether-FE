import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getReceiveAccompanyList,
  getRequestAccompanyList,
  getReviewerList,
  postAccompanyCancel,
  postAccompanyRequest,
  postApproveAccompany,
  postRejectAccompany,
  writeCompanionReview,
} from '../../api/accompany';

export const useAccompany = () => {
  const queryClient = useQueryClient();

  //내가 보낸 동행 요청목록
  const getRequestListQuery = useQuery({
    queryKey: ['accompany', 'request'],
    queryFn: getRequestAccompanyList,
    // select: (requestList) => requestList.map((list) => list.postId),
  });

  // 내가 받은 동행 요청목록
  const getReceiveListQuery = useQuery({
    queryKey: ['accompany', 'receive'],
    queryFn: getReceiveAccompanyList,
    //  select: (receiveList) =>
    //   receiveList.map((list) => [list.requestMemberId, list.postId]),
  });

  //게시글에서 동행 요청 보내기
  const requestAccompany = useMutation({
    mutationFn: postAccompanyRequest,
    onSuccess: () => queryClient.invalidateQueries(['requestAccompany']),
  });

  //게시글에서 동행 요청 취소하기
  const requestCancelAccompany = useMutation({
    mutationFn: postAccompanyCancel,
    onSuccess: () => queryClient.invalidateQueries(['requestCancleAccompany']),
  });

  // 동행 요청 승인하기
  const approveAccompany = useMutation({
    mutationFn: postApproveAccompany,
    onSuccess: () => queryClient.invalidateQueries(['accompany', 'receive']),
  });

  //동행 요청 거절하기
  const rejectAccompany = useMutation({
    mutationFn: postRejectAccompany,
    onSuccess: () => queryClient.invalidateQueries(['accompany', 'receive']),
  });

  return {
    getRequestListQuery,
    getReceiveListQuery,
    requestAccompany,
    requestCancelAccompany,
    approveAccompany,
    rejectAccompany,
  };
};

// 리뷰 대상 조회
export const useGetReviewerList = (postIds) => {
  const ReviewerList = useQuery({
    queryKey: ['ReviewerList'],
    queryFn: () => getReviewerList(postIds),
  });

  //동행 후기 작성
  const writeReview = useMutation({
    mutationFn: writeCompanionReview,
    onSuccess: () => console.log('동행 후기 작성 성공'),
  });

  return { ReviewerList, writeReview };
};
