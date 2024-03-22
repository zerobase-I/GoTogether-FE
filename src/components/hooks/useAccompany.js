import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getReceiveAccompanyList,
  getRequestAccompanyList,
  postAccompanyCancel,
  postAccompanyRequest,
} from '../../api/accompany';

const useAccompany = () => {
  const queryClient = useQueryClient();

  //내가 보낸 동행 요청목록
  const getRequestListQuery = useQuery({
    queryKey: ['accompany', 'request'],
    queryFn: getRequestAccompanyList,
  });

  // 내가 받은 동행 요청목록
  const getReceiveListQuery = useQuery({
    queryKey: ['accompany', 'receive'],
    queryFn: getReceiveAccompanyList,
  });

  //동행 요청 보내기
  const requestAccompany = useMutation({
    mutationFn: postAccompanyRequest,
    onSuccess: () => queryClient.invalidateQueries(['requestAccompany']),
  });

  // 동행 요청 취소하기
  const requestCancleAccompany = useMutation({
    mutationFn: postAccompanyCancel,
    onSuccess: () => queryClient.invalidateQueries(['requestCancleAccompany']),
  });

  return {
    getRequestListQuery,
    getReceiveListQuery,
    requestAccompany,
    requestCancleAccompany,
  };
};

export default useAccompany;
