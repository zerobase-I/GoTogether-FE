import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="flex justify-center min-h-screen items-center px-4 sm:px-6 lg:px-8 bg-[url('./assets/같이가요Login.jpg')] bg-cover">
      <div className="max-w-md w-full">
        {/* 첫페이지 LOGO  */}
        <div className="relative top-0 left-0 right-0 m-auto mb-28">
          <img className="mx-auto h-auto w-102" src="/src/assets/GoTogetherLogo.png" alt="같이가요 로고" />
        </div>

        <div className="relative text-center animate-bounce">
          <div className="inline-block mb-7 bg-gray-200 border-none rounded-full p-4 shadow-md w-1/3">
            <p className="text-xs font-semibold">3초만에 시작하기</p>
            <div className="absolute border border-gray-200 h-6 w-6 -rotate-45 bg-gray-200 bottom-5 left-1/2 transform -translate-x-3 translate-y-0">
            </div>
          </div>
        </div>

        <button className="btn mb-2 rounded-md relative block w-full px-3 py-1 border-none bg-yellow-300 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">카카오 로그인</button>
        <button className="btn mb-2 rounded-md relative block w-full px-3 py-1 border-none bg-black text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">Apple로 로그인</button>
        <Link to="/login">
        <button className="btn mb-2 rounded-md relative block w-full px-3 py-1 border-none text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">이메일로 로그인</button>
        </Link>
        <div className="flex justify-between align-middle items-center mt-10">
          <div className="border-t border-white my-4 w-44"></div>
          <p className="font-medium text-xl">or</p>
          <div className="border-t border-white my-4 w-44"></div>
        </div>
       <Link to="/signup" className="mt-10 m-autoa flex justify-center">
          <button className="btn mb-2 rounded-md relative block w-36 px-3 py-1 border-none text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">회원가입</button>
        </Link>
        <div className="text-white mt-14 text-left text-base">로그인 시 같이가요의 <span className="underline">개인정보처리방침</span> 및 <span className="underline">이용약관</span>에<br />동의하시는 것으로 간주합니다.</div>
      </div>
    </div>
  );
};

export default Auth;