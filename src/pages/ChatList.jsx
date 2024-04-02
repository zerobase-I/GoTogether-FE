import React, { useState, useEffect } from 'react';
import { getChatRoomLists } from '../api/chatroom.js';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { TokenAtom } from '/src/recoil/tokenAtom.js';

const ChatList = () => {
  const tokenInfo = useRecoilValue(TokenAtom);
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getChatRoomLists();
        setChatRooms(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [tokenInfo]);
  useEffect(() => {
    console.log(chatRooms);
  }, [chatRooms]);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: 데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl flex justify-start ml-5 font-bold mb-4">
        참여중인 채팅방
      </h1>
      <article className="grid gap-4">
        {chatRooms && chatRooms.length > 0 ? (
          chatRooms.map((room) => (
            <section
              key={room.chatRoomId}
              className="bg-white p-4 rounded-md shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out flex items-center justify-between"
              onClick={() =>
                navigate(`/chatroom/${room.chatRoomId}`, {
                  state: { roomName: room.name, postId:room.postId },
                })
              }
            >
              <div className="flex items-center gap-4">
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
          ))
        ) : (
          <div>No chat rooms available</div>
        )}
      </article>
    </div>
  );
};

export default ChatList;
