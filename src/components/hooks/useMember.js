import { useQueries, useQuery } from '@tanstack/react-query';

import { getOtherMemberInfo } from '../../api/mamber';

const useMember = (users) => {
  const getOtherMemberInfoQueries = useQueries({ queries: [] });
  return { getOtherMemberInfoQueries };
};

export default useMember;
