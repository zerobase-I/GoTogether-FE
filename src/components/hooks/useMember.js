import { useQuery } from '@tanstack/react-query';

import { getOtherMemberInfo } from '../../api/mamber';

const useMember = () => {
  const getOtherMemberInfoQuery = useQuery({
    queryKey: ['otherMemberInfo'],
    queryFn: (memberId) => getOtherMemberInfo(memberId),
  });

  return { getOtherMemberInfoQuery };
};

export default useMember;
