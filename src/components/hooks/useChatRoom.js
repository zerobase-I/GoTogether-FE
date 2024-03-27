import { useQuery } from '@tanstack/react-query';
import { getChatRoomLists } from '../../api/chatroom';

const useChatRoom = () => {
  const getChatRoomListsQuery = useQuery({
    queryKey: ['chatRoomList'],
    queryFn: getChatRoomLists,
  });

  return { getChatRoomListsQuery };
};

export default useChatRoom;
