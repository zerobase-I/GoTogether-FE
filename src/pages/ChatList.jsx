import React from 'react';
import { getChatRoomLists } from '../api/chatroom.js';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {


  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['chatRooms'],
    queryFn: getChatRoomLists, // 수정된 부분: 직접 정의한 fetchChatRooms 함수 사용
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: 데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl flex justify-start ml-5 font-bold mb-4">
        참여중인 채팅방
      </h1>
      <article className="grid gap-4">
        {data &&
          data.length > 0 &&
          data.map((room) => (
            <section
              key={room.chatRoomId} // 수정된 부분: chatRoomId 사용
              className="bg-white p-4 rounded-md shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out flex items-center justify-between"
              onClick={() => navigate(`/chatroom/${room.postId}`, { state: { roomName: room.name } })} // 수정된 부분: postId 사용
            >
              <div className="flex items-center gap-4">
                {/* <div className="w-16 rounded-md">
                  <img src={room.imageUrls[0]} alt="chat room" /> 이미지 URL이 없으므로 이 부분은 주석 처리하거나 제거
                </div> */}
                <div className="text-xm font-bold whitespace-nowrap">
                  {room.name}
                </div>
              </div>
              <div
                className={`${room.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'}`}
              >
                {room.status === 'ACTIVE' ? 'open' : 'close'}
              </div>
            </section>
          ))}
      </article>
    </div>
  );
};

export default ChatList;
