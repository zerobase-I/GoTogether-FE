import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 더미 데이터
    const dummyData = [];

    for (let i = 1; i <= 10; i++) {
      dummyData.push({
        chatRoomId: i,
        name: `채팅방 이름 ${i}`,
        status: 'ACTIVE',
        profiles: [
          { imageUrl: 'https://via.placeholder.com/150' }, // 더미 이미지 URL
          { imageUrl: 'https://via.placeholder.com/150' },
          { imageUrl: 'https://via.placeholder.com/150' },
          { imageUrl: 'https://via.placeholder.com/150' },
        ],
      });
    }

    setChatRooms(dummyData);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        setLoading(true);
        setTimeout(() => {
          const newChatRoomId = chatRooms.length + 1;
          const newChatRoom = {
            chatRoomId: newChatRoomId,
            name: `채팅방 이름 ${newChatRoomId}`,
            status: 'ACTIVE',
            profiles: [
              { imageUrl: 'https://via.placeholder.com/150' },
              { imageUrl: 'https://via.placeholder.com/150' },
            ],
          };
          setChatRooms((prevData) => [...prevData, newChatRoom]);
          setLoading(false);
        }, 1000); //로딩 딜레이
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, chatRooms]);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl flex ml-10 font-bold mb-4">참여중인 채팅방</h1>
      <Link to="/chatroom">
        <div className="grid gap-4">
          {chatRooms.map((room) => (
            <div
              key={room.chatRoomId}
              className="bg-white p-4 flex gap-5 rounded-md shadow-md hover:shadow-lg cursor-pointer transition duration-300 ease-in-out"
            >
              <div className="avatar grid grid-cols-2">
                {room.profiles
                  .slice(0, Math.min(room.profiles.length, 4))
                  .map((profile, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 overflow-hidden rounded-full"
                    >
                      <img
                        src={profile.imageUrl}
                        alt={`프로필 이미지 ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
              </div>

              <h2 className="text-xm font-bold mb-2">{room.name}</h2>
              <p
                className={`text-gray-600 ml-36 mt-4 ${room.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'}`}
              >
                {room.status === 'ACTIVE' ? 'open' : 'close'}
              </p>
            </div>
          ))}
          {loading && (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-10 w-10 text-gray-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 4.418 3.582 8 8 8v-4zm14-1.073A7.96 7.96 0 0120 12h4c0 4.418-3.582 8-8 8v-4zm-2-5.292V4.708A7.96 7.96 0 0116 12h4c0-4.418-3.582-8-8-8z"
                ></path>
              </svg>
              로딩 중...
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ChatList;
