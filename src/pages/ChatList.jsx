import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchChatRooms = async () => {
  const response = await fetch('/api/chat-room/list');
  if (!response.ok) {
    throw new Error('네트워크 오류: 목데이터를 불러올 수 없습니다.');
  }
  return response.json();
};

const ChatList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['chatRooms'], // queryKey를 배열로 변경
    queryFn: fetchChatRooms
  });


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: 데이터를 불러올 수 없습니다.</div>;

  return (
  <div className="container mx-auto my-8">
    <h1 className="text-2xl flex justify-start ml-5 font-bold mb-4">참여중인 채팅방</h1>
    <Link to="/chatroom" className="grid gap-4">
      {data && data.length > 0 && data.map(room => (
        <div
          key={room.chatRoomId}
          className="bg-white p-4 rounded-md shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 rounded-md"><img src={room.imageUrls[0]} alt="chat room"/></div>
            <div className="text-xm font-bold whitespace-nowrap">{room.name}</div>
          </div>
          <div className={`${room.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'}`}>{room.status === 'ACTIVE' ? 'open' : 'close'}</div>
        </div>
      ))}
    </Link>
  </div>
);
};

export default ChatList;