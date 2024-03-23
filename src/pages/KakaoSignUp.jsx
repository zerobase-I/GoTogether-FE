import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getKakaoUserInfo, signUpWithKakao } from '/src/api/kakaoAuthAPI';
import signUpAPI from '/src/api/signUpAPI.js';
const KakaoSignUp = () => {
     const [isNicknameAvailable, setIsNicknameAvailable] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isNicknameChecked, setIsNicknameChecked] = useState('');
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

  const handleCheckNickname = async () => {
    try {
      const response = await signUpAPI.checkNickname(userInput.nickname);
      const isAvailable = response.data;
      console.log(`닉네임 중복 확인 응답:`, response.data);
      setIsNicknameAvailable(isAvailable);
      setIsNicknameChecked(isAvailable ? false : true);
      alert(
        isAvailable
          ? '이미 사용중인 닉네임입니다.'
          : '사용 가능한 닉네임입니다.',
      );
    } catch (error) {
      console.error('닉네임 중복 체크 실패:', error);
      console.log(error.response.data);
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const handlePhoneNumberChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setUserInput({ ...userInput, phoneNumber: formattedNumber });
  };

  return (
  <div className="min-h-screen ml-5 mr-5 bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Link to="/member">
        <div className="left-6 top-14 w-5">
          <img src="/src/assets/left-arrow.png" alt="왼쪽 화살표" />
        </div>
      </Link>
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
     <h2 className="ml-5 mt-14 mb-7 text-3xl flex item-start font-extrabold text-gray-900">
          카카오 회원 추가정보
        </h2>
      <form onSubmit={handleSubmit}>

         <div className="relative">
            <div>
              <h2 className="flex ml-3 text-xl text-blue-500">닉네임</h2>
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                className="aappearance-none mb-7 rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="닉네임"
                value={userInput.nickname}
                onChange={handleChange}
              />
              <div>
                <button
                  type="button"
                  disabled={!userInput.nickname.trim()}
                  onClick={handleCheckNickname}
                  className="z-10 absolute top-7 mt-1 right-8 self-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-500 bg-transparent"
                >
                  중복 확인
                </button>
              </div>
              {isNicknameChecked && (
                <span className="text-blue-500 absolute top-10 right-5">
                  ✔
                </span>
              )}
            </div>
          </div>
         <div>
            <h2 className="flex ml-3 text-xl text-blue-500">주소</h2>
            <label htmlFor="address" className="sr-only">
              주소
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="appearance-none mb-7 rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="주소"
              value={userInput.address}
              onChange={handleChange}
            />
          </div>
         <div>
            <h2 className="flex ml-3 text-xl text-blue-500">전화번호</h2>
            <label htmlFor="phone" className="sr-only">
              전화번호
            </label>
           <input
              id="phone"
              name="phoneNumber" // 필드의 name을 'phoneNumber'으로 변경하여 handleChange 함수와 일관성 유지
              type="tel"
              required
              className="appearance-none mb-7 rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="전화번호"
              value={userInput.phoneNumber} // 이 부분을 userInput 상태의 phoneNumber 속성을 참조하도록 수정
              onChange={handlePhoneNumberChange} // handlePhoneNumberChange 함수 사용
            />
          </div>
       <div>
            <h2 className="flex ml-3 text-xl text-blue-500">나이</h2>
            <label htmlFor="age" className="sr-only">
              나이
            </label>
            <input
              id="age"
              name="age"
              type="text"
              required
              className="appearance-none mb-7 rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="나이"
              value={userInput.age}
              onChange={handleChange}
            />
          </div>
       <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <h2 className="flex ml-3 text-xl text-blue-500">MBTI</h2>
              <label htmlFor="mbti" className="sr-only">
                MBTI
              </label>
              <input
                id="mbti"
                name="mbti"
                type="text"
                className="appearance-none mb-7 rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="MBTI (선택 사항)"
                value={userInput.mbti}
                onChange={handleChange}
              />
            </div>
            <div>
              <h2 className="flex ml-3 text-xl text-blue-500">Instagram ID</h2>
              <label htmlFor="instagramId" className="sr-only">
                Instagram ID
              </label>
              <input
                id="instagramId"
                name="instagramId"
                type="text"
                className="appearance-none mb-7 rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Instagram ID (선택 사항)"
                value={userInput.instagramId}
                onChange={handleChange} // 여기를 수정했습니다.
              />
            </div>
            <div>
              <h2 className="flex ml-3 mb-3 text-xl text-blue-500">
                자기소개 한마디!
              </h2>
              <label htmlFor="description" className="sr-only">
                자기소개
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="appearance-none mb-7 block m-auto w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="자기소개 (선택 사항)"
                value={userInput.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
         <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500"
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KakaoSignUp;