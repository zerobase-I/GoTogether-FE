import React, { useState,useEffect } from 'react';
import { deleteUser,  toggleAlarmSetting,getAlarmStatus } from '/src/api/setting.js';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState('false');
  const navigate = useNavigate(); // 로그아웃 후 리다이렉션을 위해 사용


   useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      getAlarmStatus(accessToken).then((alarmStatus) => {
        setNotificationsEnabled(alarmStatus);
      }).catch((error) => {
        console.error('알람 상태 조회 실패:', error);
      });
    }
   }, []);
  
  

  const handleToggleNotifications = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('로그인 상태가 아닙니다.');
      return;
    }

    try {
      const newSetting = !notificationsEnabled;
      const success = await toggleAlarmSetting(accessToken, newSetting);
      if (success) {
        setNotificationsEnabled(newSetting); // 상태 업데이트
      }
    } catch (error) {
      console.error('알람 설정 변경 중 오류 발생:', error);
      alert('알람 설정 변경에 실패했습니다.');
    }
  };

  


  const handleDeleteAccount = async () => {
  // 회원 탈퇴 로직 구현
  console.log('회원 탈퇴 기능이 실행됩니다.');

  // confirm을 사용해 사용자의 결정을 확인
  const isConfirmed = confirm('정말 회원을 탈퇴하시겠습니까?');

  if (!isConfirmed) {
    // 사용자가 '취소'를 클릭한 경우
    console.log('회원 탈퇴가 취소되었습니다.');
    return; // 여기서 함수 실행을 멈춥니다.
  }

  try {
    const accessToken = localStorage.getItem('accessToken'); // 액세스 토큰 관리
    if (!accessToken) throw new Error('로그인 상태가 아닙니다.');

    await deleteUser(accessToken);
    alert('회원 탈퇴가 완료되었습니다. 로그인 페이지로 이동합니다.');
    localStorage.removeItem('accessToken'); // 토큰 삭제
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userDetails');
    navigate('/member'); // 로그인 페이지로 리다이렉션
  } catch (error) {
    console.error('회원 탈퇴 처리 중 오류가 발생했습니다:', error);
    alert(error.message);
  }
};

  return (

    <>
    <div className="container mx-auto p-3">
      <h1 className="text-3xl font-bold flex mt-3 justify-start">설정</h1>
       {/* <div className="border-t border-gray-500 my-4 w-44"></div> */}
    <div className="max-w-md mx-auto mt-8">
     
        <div className="border-t flex justify-between border-gray-200 py-8">
          <div className="menu-item tx-xl flex justify-start">공지사항</div>
          <img src="/src/assets/left-arrow.png" className="w-5 transform scale-x-[-1] w-100" alt="Left Arrow" />
        </div>
        <div className="border-t flex justify-between border-gray-200 py-8">
            <div className="menu-item flex justify-start">이벤트</div>
            <img src="/src/assets/left-arrow.png" className="w-5 transform scale-x-[-1] w-100" alt="Left Arrow" />
        </div>
        <div className="border-t flex justify-between border-gray-200 py-8 items-center">
          <div className="menu-item">알림</div>
          <label className="relative inline-block w-14 h-8">
            <input
              type="checkbox"
              className="opacity-0 w-0 h-6"
              checked={notificationsEnabled}
              onChange={handleToggleNotifications}
            />
            <span
              className={`absolute cursor-pointer top-1 right-0 w-14 h-6 bottom-0 rounded-full transition-colors ease-in-out duration-200 ${notificationsEnabled ? 'bg-blue-500' : 'bg-gray-500'}`}
              style={{transition: 'background-color 0.2s'}}
            ></span>
            <span
              className={`absolute transform bg-blue-300 top-1 w-6 h-6 left-0 rounded-full transition-transform ease-in-out duration-200 ${notificationsEnabled ? 'translate-x-8' : 'translate-x-0'}`}
              style={{transition: 'transform 0.2s'}}
            ></span>
          </label>
        </div>
        <div className="border-t flex justify-between border-gray-200 py-8">
            <div className="menu-item flex justify-start">문의하기</div>
            <img src="/src/assets/left-arrow.png" className="w-5 transform scale-x-[-1] w-100" alt="Left Arrow" />
        </div>
        <div className="border-t flex justify-between border-gray-200 py-8">
            <div className="menu-item flex justify-start">사용법</div>
            <img src="/src/assets/left-arrow.png" className="w-5 transform scale-x-[-1] w-100" alt="Left Arrow" />
        </div>
        <div className="border-t flex justify-between border-gray-200 py-8">
            <div className="menu-item flex justify-start">개인정보취급방침</div>
            <img src="/src/assets/left-arrow.png" className="w-5 transform scale-x-[-1] w-100" alt="Left Arrow" />
        </div>
        <div className="border-t flex justify-between border-gray-200 py-8">
            <div className="menu-item flex justify-start">약관</div>
            <img src="/src/assets/left-arrow.png" className="w-5 transform scale-x-[-1] w-100" alt="Left Arrow" />
        </div>
        <div className="border-t flex justify-between border-gray-200 py-8">
            <div className="menu-item flex justify-start">버전</div>
            <img src="/src/assets/left-arrow.png" className="w-5 transform scale-x-[-1] w-100" alt="Left Arrow" />
        </div>
        <div className="border-t flex mb-10 justify-between border-gray-200 py-8" onClick={handleDeleteAccount}>
            <div className="menu-item flex justify-start">회원탈퇴</div>
            <img src="/src/assets/left-arrow.png" className="w-5 transform scale-x-[-1] w-100" alt="Left Arrow" />
        </div>
   
    </div>
     </div>
    </>
      
     
  );
};

export default Setting;