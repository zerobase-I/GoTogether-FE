import './index.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Layouts/Header';
import Navbar from './components/Layouts/Navbar';

/* 라우팅을 위한 컴포넌트 입니다. */
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Navbar />
    </>
  );
}

export default App;
