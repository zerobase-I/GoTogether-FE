import { useQuery } from '@tanstack/react-query';

import { getMyReviewInfo } from '../../api/mamber';

const useMember = (memberId) => {
  const getMyReviewQuery = useQuery({
    queryKey: ['myreview'],
    queryFn: () => getMyReviewInfo(memberId),
  });
  return { getMyReviewQuery };
};

export default useMember;
