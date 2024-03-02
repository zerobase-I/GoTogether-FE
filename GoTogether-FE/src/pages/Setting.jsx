import React, { useState } from 'react';

const Setting = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleDeleteAccount = () => {
    // 회원 탈퇴 기능 구현
    console.log('회원 탈퇴 기능이 실행됩니다.');
  };

  return (

    <>
    <div className="container mx-auto p-3">
      <h1 className="text-3xl font-bold flex justify-start">설정</h1>
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
        <div className="border-t flex justify-between border-gray-200 py-8">
            <div className="menu-item flex justify-start">알림</div>
         <label className="inline-flex items-center">
  <input type="checkbox" value="synthwave" className="toggle bg-gray-500 appearance-none w-13 h-6 rounded-xl checked:bg-blue-500 theme-controller" />
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
        <div className="border-t flex mb-10 justify-between border-gray-200 py-8">
            <div className="menu-item flex justify-start">회원탈퇴</div>
            <img src="/src/assets/left-arrow.png" className="w-5 transform scale-x-[-1] w-100" alt="Left Arrow" />
        </div>
   
    </div>
     </div>
    </>
      
     
  );
};

export default Setting;