import './index.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Layouts/Header';
import Navbar from './components/Layouts/Navbar';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

/* 라우팅을 위한 컴포넌트 입니다. */
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
        <Navbar />
      </QueryClientProvider>
    </>
  );
}

export default App;