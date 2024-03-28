import React from 'react';
import { useLocation,Link } from 'react-router-dom';

const ChatRoomHeader = () => {
  const location = useLocation();
  const { roomName } = location.state || {}; // 상태가 없는 경우를 위해 기본값 설정

  return (
      <header className="flex justify-between items-center h-20 bg-gray-800 pl-8 pr-2 sm:px-6 lg:px-8 shadow-md sticky top-0 z-10">
      <Link to="/chatList"><img src="/src/assets/right-arrow-white.png" className="w-6 rotate-180"/></Link>    
      <h1 className="text-xl pl-6 text-white">{roomName}</h1>
      <div className="text-transparent bg-transparent"><h1>토글버튼</h1></div>
    </header>
  );
};

export default ChatRoomHeader;