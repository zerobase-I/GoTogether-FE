import { useQuery } from '@tanstack/react-query';

import { getMyReviewInfo, getOtherMemberInfo } from '../../api/member';

const useMember = (memberId) => {
  const getMyReviewQuery = useQuery({
    queryKey: ['myreview'],
    queryFn: () => getMyReviewInfo(memberId),
  });

  const getOtherMemberInfoQuery = useQuery({
    queryKey: ['otherMember'],
    queryFn: () => getOtherMemberInfo(memberId),
  });
  return { getMyReviewQuery, getOtherMemberInfoQuery };
};

export default useMember;
