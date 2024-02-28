import { Outlet } from 'react-router-dom';
import Header from './components/Header';

import './index.css';
import Navbar from './components/Navbar';

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
