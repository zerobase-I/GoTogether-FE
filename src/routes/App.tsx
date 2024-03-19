import '../index.css';
import { Outlet } from 'react-router-dom';
import Header from '../components/Layouts/Header';
import Navbar from '../components/Layouts/Navbar';

import { useLocation } from 'react-router-dom';
import ChatRoomHeader from '../components/Layouts/chatRoomHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  // /chatroom/:postId 형태의 경로에 대한 정규식 패턴
  const chatRoomPathPattern = /^\/chatroom\/[0-9a-zA-Z]+$/;
  // 현재 경로가 /chatroom/:postId 형태인지 확인
  const isChatRoomPage = chatRoomPathPattern.test(location.pathname);
/* 라우팅을 위한 컴포넌트 입니다. */
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {isChatRoomPage ? <ChatRoomHeader /> : <Header />}
        <Outlet />
        <Navbar />
      </QueryClientProvider>
    </>
  );
}

export default App;
