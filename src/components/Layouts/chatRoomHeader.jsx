import React from 'react';
import { useLocation } from 'react-router-dom';

const ChatRoomHeader = () => {
  const location = useLocation();
  const { roomName } = location.state || {}; // 상태가 없는 경우를 위해 기본값 설정

  return (
      <header className="flex justify-between items-center h-20 bg-gray-800 px-4 sm:px-6 lg:px-8 shadow-md sticky top-0 z-10">
          <img src="/src/assets/right-arrow-white.png" className="w-6 rotate-180"/>
      <h1 className="text-xl text-white">{roomName}</h1>
      {/* 나머지 코드 */}
    </header>
  );
};

export default ChatRoomHeader;