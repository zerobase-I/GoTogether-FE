import { useQuery } from '@tanstack/react-query';
import { getChatParticipantList, getChatRoomLists } from '../../api/chatroom';

export const useChatRoom = () => {
  const getChatRoomListsQuery = useQuery({
    queryKey: ['chatRoomList'],
    queryFn: getChatRoomLists,
  });

  return { getChatRoomListsQuery };
};

export const useChatParticipantList = (chatRoomId) => {
  const getChatParticipantListQuery = useQuery({
    queryKey: ['chatParticipants', chatRoomId],
    queryFn: () => getChatParticipantList(chatRoomId),
    enabled: !!chatRoomId,
  });

  return { getChatParticipantListQuery };
};
