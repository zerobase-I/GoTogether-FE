import React, { useState,useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import signUpAPI from '/src/api/signUpAPI.js';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [authCode, setAuthCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [mbti, setMbti] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [description, setDescription] = useState('');
  const [isEmailAvailable, setIsEmailAvailable] = useState('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [image, setImage] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState('');
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [isNicknameChecked, setIsNicknameChecked] = useState('');


  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,20}$/;
    return regex.test(password);
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  useEffect(() => {
    // 비밀번호 형식 검사
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      setPasswordError("영문, 숫자, 특수문자를 포함한 10~20자리여야 합니다.");
    } else {
      setPasswordError('');
    }
  }, [email, password, confirmPassword, name, nickname, address, phoneNumber,]); // 의존성 배열에 모든 필요한 상태를 추가합니다.

  const handlePhoneNumberChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]); // 파일 상태 업데이트
  };

  const handleRequestEmailVerification = async () => {
    try {
      await signUpAPI.requestEmailVerification(email);
      alert('인증 메일이 발송되었습니다. 메일을 확인해 주세요.');
    } catch (error) {
      console.error('이메일 인증 요청 실패:', error);
      alert('이메일 인증 요청에 실패했습니다.');
    }
  };

  const handleVerifyEmailCode = async () => {
    try {
      await signUpAPI.verifyEmailCode(email, authCode);
      alert('이메일이 성공적으로 인증되었습니다.');
      setVerifiedEmail(email); // 이메일 인증 성공 했을 때, 인증된 이메일로 업데이트
    } catch (error) {
      console.error('이메일 인증 실패:', error);
      alert('이메일 인증에 실패했습니다.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let emailAuth = false; // 기본값은 false로 설정
    if (email === verifiedEmail) {
      emailAuth = true; // 이메일이 인증된 이메일과 일치하면 true로 설정
    } else {
      alert('변경된 이메일로 인증을 다시 진행해주세요.');
      return;
    }

    if (!validatePassword(password)) {
    alert("비밀번호는 영문, 숫자, 특수문자를 포함한 10~20자리여야 합니다.");
    setPassword(''); // 비밀번호 입력란 초기화
    return; // 함수 실행 중단
  }

    const requestData = {
      email: email,
      password: password,
      name: name,
      nickname: nickname,
      address: address,
      phoneNumber: phoneNumber,
      age: age,
      gender: gender,
      mbti: mbti || null,
      instagramId: instagramId || null,
      description: description || null,
      emailAuth: emailAuth,
    };

    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

    
    if (image) {
      formData.append('profileImageUrl', image);
    }

    console.log('Request Data:', requestData);
    if (image) {
      console.log('Image File:', image.name);
    }

    try {
      const response = await signUpAPI.submitSignUpForm(formData);
      console.log('Response Data:', response.data);
      alert('회원가입 성공');
      navigate('/member/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  const handleCheckEmail = async () => {
    try {
      const response = await signUpAPI.checkEmail(email);
      const isAvailable = response.data;
      console.log(response.data);
      setIsEmailAvailable(isAvailable);
      setIsEmailChecked(isAvailable ? false : true);
      alert(isAvailable ? '이미 사용중인 이메일입니다.' : '사용 가능한 이메일입니다.');
    } catch (error) {
      console.error('이메일 중복 체크 실패:', error);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordsMatch(newPassword === confirmPassword);
  };

 const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  const handleCheckNickname = async () => {
    try {
      const response = await signUpAPI.checkNickname(nickname);
      const isAvailable = response.data;
      console.log(`닉네임 중복 확인 응답:`, response.data);
      setIsNicknameAvailable(isAvailable);
      setIsNicknameChecked(isAvailable ? false : true);
      alert(isAvailable ? '이미 사용중인 닉네임입니다.' : '사용 가능한 닉네임입니다.');
    } catch (error) {
      console.error('닉네임 중복 체크 실패:', error);
      console.log(error.response.data);
    }
  };

   const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (verifiedEmail && e.target.value !== verifiedEmail) {
      setVerifiedEmail(''); // 인증된 이메일과 현재 입력된 이메일이 다르면 인증 상태 초기화
    }
  };

  return (
    <div className="min-h-screen ml-5 mr-5 bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Link to="/member">
        <div className="absolute left-6 top-14 w-5">
          <img src="/src/assets/left-arrow.png" alt="왼쪽 화살표" />
        </div>
      </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="ml-5 mt-14 text-3xl flex item-start font-extrabold text-gray-900">
          이메일로 회원가입
        </h2>

        <form className="mt-8  space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <div >
                <h2 className="flex ml-3 text-xl text-blue-500">이메일</h2>
                <label htmlFor="email" className="sr-only">
                  이메일 주소
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="relative appearance-none rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="example@naver.com"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleCheckEmail}
                  disabled={!email.trim()}
                  className="z-10 absolute top-7 mt-1 right-8 self-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-500 bg-transparent"
                >
                  중복 확인
                </button>
              </div>
               {isEmailChecked && <span className="text-blue-500 absolute top-10 right-5">✔</span>}
            </div>
            <div>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center py-2 px-4 mb-7 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-500"
                onClick={handleRequestEmailVerification}
                disabled={!isEmailChecked}
              >
                이메일 인증 요청
              </button>
             
            </div>
            <div>
              <h2 className="flex ml-3 text-xl text-blue-500">인증코드</h2>
              <label htmlFor="authCode" className="sr-only">
                인증코드
              </label>
              <input
                id="authCode"
                name="authCode"
                type="text"
                required
                className="appearance-none rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="인증코드를 입력해주세요"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
              />
            </div>
            <div>
              <button
                type="button"
                disabled={!authCode.trim()}
                className="mt-3 w-full m-auto mb-7 flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-500"
                onClick={handleVerifyEmailCode}
              >
                인증코드 확인
              </button>
              
            </div>
            <div>
              <h2 className="flex ml-3 text-xl text-blue-500">비밀번호</h2>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
              />
               <p className={`text-xs ${passwordError ? 'text-red-500' : 'text-gray-500'} text-right mb-7`}>{passwordError || "영문, 숫자, 특수문자를 포함한 10~20자리여야 합니다."}</p>
            </div>
            <div>
              <h2 className="flex ml-3 text-xl text-blue-500">비밀번호 확인</h2>
              <label htmlFor="confirm-password" className="sr-only">
                비밀번호 확인
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="appearance-none rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {!passwordsMatch && <p className="text-xs text-red-500 text-right mb-7">비밀번호가 일치하지 않습니다.</p>}
            </div>
          </div>
          <div>
            <h2 className="flex ml-3 text-xl text-blue-500">이름</h2>
            <label htmlFor="name" className="sr-only">
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div>
              <h2 className="flex ml-3 text-xl text-blue-500">닉네임</h2>
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                className="aappearance-none rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <div>
                <button
                  type="button"
                  disabled={!nickname.trim()}
                  onClick={handleCheckNickname}
                  className="z-10 absolute top-7 mt-1 right-8 self-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-500 bg-transparent"
                >
                  중복 확인
                </button>
              </div>
              {isNicknameChecked && <span className="text-blue-500 absolute top-10 right-5">✔</span>}
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
              className="appearance-none rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <h2 className="flex ml-3 text-xl text-blue-500">전화번호</h2>
            <label htmlFor="phone" className="sr-only">
              전화번호
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="appearance-none rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="전화번호"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
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
              className="appearance-none rounded-none block m-auto w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="나이"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
                value={mbti}
                onChange={(e) => setMbti(e.target.value)}
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
                value={instagramId}
                onChange={(e) => setInstagramId(e.target.value)}
              />
            </div>
            <div>
              <h2 className="flex ml-3 text-xl text-blue-500">자기소개 한마디!</h2>
              <label htmlFor="description" className="sr-only">
                자기소개
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="appearance-none block m-auto w-full px-3 py-3 border border-gray-500 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="자기소개 (선택 사항)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div>
            <label htmlFor="image" className="block text-xl text-left ml-3 font-medium text-blue-500">
              프로필 이미지
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setGender('MALE')}
              className={`py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                gender === 'MALE' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
              } focus:outline-none`}
            >
              남자
            </button>
            <button
              type="button"
              onClick={() => setGender('FEMALE')}
              className={`py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                gender === 'FEMALE' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-900'
              } focus:outline-none`}
            >
              여자
            </button>
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
    </div>
  );
};

export default SignUp;
