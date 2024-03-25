import React from 'react';
import { IoHome, IoSettingsSharp, IoLogOutOutline } from 'react-icons/io5';
import { Link,useNavigate } from 'react-router-dom';
import { logout } from '/src/api/setting.js';

const Header = () => {
  
  const navigate = useNavigate();
  const handleLogout = async () => {
  // 회원 탈퇴 로직 구현
  console.log('로그아웃 기능이 활성화 됩니다.');

  // confirm을 사용해 사용자의 결정을 확인
  const isConfirmed = confirm('로그아웃 하시겠습니까?');

  if (!isConfirmed) {
    // 사용자가 '취소'를 클릭한 경우
    console.log('로그아웃이 취소 되었습니다.');
    return; // 여기서 함수 실행을 멈춥니다.
  }

  try {
    const accessToken = localStorage.getItem('accessToken'); // 액세스 토큰 관리
    if (!accessToken) throw new Error('로그인 상태가 아닙니다.');

    await logout(accessToken);
    alert('로그아웃이 완료되었습니다. 로그인 페이지로 이동합니다.');
    localStorage.removeItem('accessToken'); // 토큰 삭제
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userDetails');
    navigate('/member/login'); // 로그인 페이지로 리다이렉션
  } catch (error) {
    console.error('회원 탈퇴 처리 중 오류가 발생했습니다:', error);
    alert(error.message);
  }
  };
  
  return (
    <header className="flex justify-between items-center h-20 bg-gradient-to-r from-gray-700 to-gray-900 px-4 sm:px-6 lg:px-8 shadow-md sticky top-0 z-50">
      <Link to="/" className="flex  text-white hover:text-gray-300 transition duration-150 ease-in-out">
        <IoHome className="ml-7 mr-7 text-2xl md:text-2xl" />
      </Link>
        <span className="text-white text-2xl md:text-2xl" >Go Together</span>
      <div className="flex items-center">
        <div onClick={handleLogout} className="transition duration-150 ease-in-out hover:scale-110 mr-4">
          <IoLogOutOutline className="text-3xl md:text-3xl text-white hover:text-gray-300" />
        </div>
        <Link to="/settings" className="transition duration-150 ease-in-out hover:scale-110">
          <IoSettingsSharp className="text-2xl md:text-3xl text-white hover:text-gray-300" />
        </Link>
      </div>
    </header>
  );
};

export default Header;