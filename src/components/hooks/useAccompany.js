import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getReceiveAccompanyList,
  getRequestAccompanyList,
  postAccompanyCancel,
  postAccompanyRequest,
  postApproveAccompany,
  postRejectAccompany,
} from '../../api/accompany';

const useAccompany = () => {
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
  const requestCancleAccompany = useMutation({
    mutationFn: postAccompanyCancel,
    onSuccess: () => queryClient.invalidateQueries(['requestCancleAccompany']),
  });

  // 동행 요청 승인하기
  const approveApprove = useMutation({
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
    requestCancleAccompany,
    approveApprove,
    rejectAccompany,
  };
};

export default useAccompany;
