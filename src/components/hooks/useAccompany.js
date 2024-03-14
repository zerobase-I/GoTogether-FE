import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequestList } from '../../api/accompany';

const useAccompany = () => {
  const queryClient = useQueryClient();

  const getRequestListQuery = useQuery({
    queryKey: ['accompany'],
    queryFn: getRequestList,
  });

  return { getRequestListQuery };
};

export default useAccompany;
