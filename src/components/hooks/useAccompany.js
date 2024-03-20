import { useQuery } from '@tanstack/react-query';
import { getReceiveRequestList, getRequestList } from '../../api/accompany';

const useAccompany = () => {
  // const queryClient = useQueryClient();

  //내가 보낸 동행 요청목록
  const getRequestListQuery = useQuery({
    queryKey: ['accompany'],
    queryFn: getRequestList,
  });

  // 내가 받은 동행 요청목록
  const getReceiveRequestListQuery = useQuery({
    queryKey: ['accompany'],
    queryFn: getReceiveRequestList,
  });

  return { getRequestListQuery, getReceiveRequestListQuery };
};

export default useAccompany;
