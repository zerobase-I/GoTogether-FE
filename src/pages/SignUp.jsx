import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  // 나중에 로직 추가 해야 후 작업 가능

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/member">
        <div className="absolute left-6 top-14 w-5">
          <img src="/src/assets/left-arrow.png" alt="왼쪽 화살표"/> 
        </div>
      </Link>
      <div>
        <h2 className="ml-5 mt-14 text-3xl flex item-start font-extrabold text-gray-900">
          이메일로 회원가입
        </h2>
      </div>
      <form className="mt-8 space-y-6" action="#" method="POST">
        <div className="rounded-full shadow-sm -space-y-px">
          <div className="relative rounded-full shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="password" className="flex items-start text-blue-500 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" width="10" height="10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
                </svg>
                이메일 주소
              </label>
              <input id="email" name="email" type="email" autoComplete="email" required  
                    className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                    placeholder="이메일 주소"/>
              <button type="button" className="absolute top-4 right-0 bg-transparent text-gray-500 py-1 px-4 rounded-md text-sm focus:outline-none">중복확인</button>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-2">
            <button type="button" className="bg-gray-500 text-white py-2 mb-5 px-36 rounded-full text-sm focus:outline-none transform transition duration-200 hover:scale-100 active:scale-95 ">이메일 인증 요청</button>
          </div>

          <div>
            <label htmlFor="auth-code" className="flex items-start text-blue-500 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" width="10" height="10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
                </svg>인증코드</label>
            <input id="auth-code" name="auth-code" type="text" required className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="인증코드 (시간제한)"/>
          </div>
          <div>
            <button type="button" className="bg-gray-500 text-white py-2 mb-5 px-36 rounded-full text-sm focus:outline-none transform transition duration-200 hover:scale-100 active:scale-95">이메일 인증완료</button>
          </div>
        </div>
        <div className="mt-8">
          <label htmlFor="password" className="flex items-start text-blue-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" width="10" height="10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
                </svg>비밀번호</label>
          <input id="password" name="password" type="password" autoComplete="new-password" required className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="비밀번호"/>
          <p className="flex justify-start text-xs text-gray-500">영문 대소문자, 숫자, 특수문자 포함 8자리 이상 입력해주세요!</p>
        </div>
        <div>
          <label htmlFor="confirm-password" className="flex items-start text-blue-500 text-xs">비밀번호 확인</label>
          <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="비밀번호 확인"/>
        </div>
        <div>
          <label htmlFor="name" className="flex items-start text-blue-500 text-xs">이름</label>
          <input id="name" name="name" type="text" required className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="이름"/>
        </div>
        <div>
          <label htmlFor="nickname" className="flex items-start text-blue-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" width="10" height="10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
                </svg>닉네임</label>
          <input id="nickname" name="nickname" type="text" required className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="닉네임"/>
        </div>
        <div>
          <label htmlFor="address" className="flex items-start text-blue-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" width="10" height="10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
                </svg>주소</label>
          <input id="address" name="address" type="text" required className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="주소"/>
        </div>
        <div>
          <label htmlFor="phone" className="flex items-start text-blue-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" width="10" height="10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
                </svg>전화번호</label>
          <input id="phone" name="phone" type="tel" required className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="전화번호"/>
        </div>
        <div>
          <label htmlFor="age" className="flex items-start text-blue-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" width="10" height="10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
            </svg>나이</label>
          <input id="age" name="age" type="tel" required className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="나이"/>
        </div>
        <div>
          <label htmlFor="age" className="flex items-start text-blue-500 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" width="10" height="10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
            </svg>성별</label>
          
        </div>
        <div className="flex items-center space-x-4">
          <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md text-sm focus:outline-none  focus:bg-blue-600 transform transition duration-200 hover:scale-100 active:scale-95">남자</button>
          <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md text-sm focus:outline-none  focus:bg-blue-600 transform transition duration-200 hover:scale-100 active:scale-95">여자</button>
        </div>
        
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transform transition duration-200 hover:scale-100 active:scale-95">가입하기</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;