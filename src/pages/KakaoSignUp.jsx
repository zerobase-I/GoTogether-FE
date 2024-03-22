import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getKakaoUserInfo, signUpWithKakao } from '/src/api/kakaoAuthAPI';

const KakaoSignUp = () => {

   

    const navigate = useNavigate();
    const location = useLocation();
    const kakaoUserInfo = location.state?.userInfo;
    const code = location.state?.code;
  const [userInput, setUserInput] = useState({
    nickname: '',
    address: '',
    phoneNumber: '',
    age: '',
    mbti: '',
    instagramId: '',
    description: '',
  });
    
    //  useEffect(() => {
    // if (!code) {
    //   navigate('/member');
    // }
    // }, []);
    
  
//   const { data: kakaoUserInfo, isError, error } = useQuery({
//     queryKey: ['kakaoUserInfo', code],
//     queryFn: () => getKakaoUserInfo(code),
//     retry:false,
//     enabled: !!code,
//   });

  if (kakaoUserInfo) {
    console.log('KakaoUserInfo', kakaoUserInfo);
    }
    
    if (code) {
    console.log('code',code);
  }

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfoToSubmit = {
      ...userInput,
      name: kakaoUserInfo?.name,
      email: kakaoUserInfo?.email,
      gender: userInput.gender ? userInput.gender.toUpperCase() : kakaoUserInfo.gender?.toUpperCase()
    };
    try {
      const signUpResponse = await signUpWithKakao(userInfoToSubmit);
        console.log('회원가입 성공:', signUpResponse);
        const { accessToken, refreshToken, accessToken_expiredTime, refreshToken_expiredTime } = signUpResponse;
        
      localStorage.setItem('userDetails', JSON.stringify(userInfoToSubmit));
      localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
        navigate('/');
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      if (error.response?.data?.error === 'DUPLICATE_USER') {
          alert('이미 가입되어있는 이메일 입니다.')
          navigate('/login')
      } 
      return;
    }
  };

  return (
    <div>
      <h2>추가 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        {/* 각 입력 필드 구현 */}
         <div>
    <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
      닉네임
    </label>
    <input
      id="nickname"
      name="nickname"
      type="text"
      required
      className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="닉네임"
      value={userInput.nickname}
      onChange={handleChange}
    />
  </div>
        <div>
    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
      주소
    </label>
    <input
      id="address"
      name="address"
      type="text"
      required
      className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="주소"
      value={userInput.address}
      onChange={handleChange}
    />
  </div>
         <div>
    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
      전화번호
    </label>
    <input
      id="phoneNumber"
      name="phoneNumber"
      type="text"
      required
      className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="전화번호"
      value={userInput.phoneNumber}
      onChange={handleChange}
    />
  </div>
       <div>
    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
      나이
    </label>
    <input
      id="age"
      name="age"
      type="number"
      required
      className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="나이"
      value={userInput.age}
      onChange={handleChange}
    />
  </div>
        <div>
    <label htmlFor="mbti" className="block text-sm font-medium text-gray-700">
      MBTI (선택 사항)
    </label>
    <input
      id="mbti"
      name="mbti"
      type="text"
      className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="MBTI"
      value={userInput.mbti}
      onChange={handleChange}
    />
  </div>
         <div>
    <label htmlFor="instagramId" className="block text-sm font-medium text-gray-700">
      Instagram ID (선택 사항)
    </label>
    <input
      id="instagramId"
      name="instagramId"
      type="text"
      className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="Instagram ID"
      value={userInput.instagramId}
      onChange={handleChange}
    />
  </div>
         <div>
    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
      자기소개 (선택 사항)
    </label>
    <textarea
      id="description"
      name="description"
      rows="4"
      className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="자기소개"
      value={userInput.description}
      onChange={handleChange}
    ></textarea>
  </div>
         <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              가입하기
            </button>
          </div>
        </form>
    </div>
  );
};

export default KakaoSignUp;