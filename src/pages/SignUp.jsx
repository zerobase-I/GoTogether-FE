import React, { useState } from 'react';
import { useRecoilState,useRecoilValue } from 'recoil';
import signUpAPI from '/src/api/signUpAPI.js';
import { Link, useNavigate} from 'react-router-dom';


const SignUp = () => {
  const navigate = useNavigate();
  const [authCode, setAuthCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

   const handleFileChange = (event) => {
    setImage(event.target.files[0]); // 파일 상태 업데이트
  };
  
  const handleRequestEmailVerification = async () => {
  try {
    await signUpAPI.requestEmailVerification(email); // 객체 대신 email 문자열을 직접 전달
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
  } catch (error) {
    console.error('이메일 인증 실패:', error);
    alert('이메일 인증에 실패했습니다.');
  }
};

const handleSubmit = async (event) => {
    event.preventDefault();

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
    };

    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(requestData)], {type: "application/json"}));

    if (image) {
        formData.append('profileImageUrl', image);
    }

    console.log("Request Data:", requestData);
    if (image) {
        console.log("Image File:", image.name);
    }

    try {
        const response = await signUpAPI.submitSignUpForm(formData);
        console.log("Response Data:", response.data);
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
    alert(isAvailable ? '이미 사용중인 이메일입니다.' : '사용 가능한 이메일입니다.');
  } catch (error) {
    console.error('이메일 중복 체크 실패:', error);
  }
};

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(password === e.target.value);
  };
  
  const handleCheckNickname = async () => {
  try {
    const response = await signUpAPI.checkNickname(nickname);
    const isAvailable = response.data;
    console.log(`닉네임 중복 확인 응답:`, response.data); // 추가된 로그
    setIsNicknameAvailable(isAvailable);
    alert(isAvailable ? '이미 사용중인 닉네임입니다.' : '사용 가능한 닉네임입니다.');
  } catch (error) {
    console.error('닉네임 중복 체크 실패:', error);
    console.log(error.response.data); // 오류 응답을 로깅
  }
};


  return (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Link to="/member">
        <div className="absolute left-6 top-14 w-5">
          <img src="/src/assets/left-arrow.png" alt="왼쪽 화살표" />
        </div>
      </Link>    
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
       <h2 className="ml-5 mt-14 text-3xl flex item-start font-extrabold text-gray-900">
          이메일로 회원가입
        </h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          {/* 1. 이메일 주소 입력 */}
           <div>
    <label htmlFor="email" className="sr-only">이메일 주소</label>
    <input
      id="email"
      name="email"
      type="email"
      required
      autoComplete="email"
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="이메일 주소"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
            </div>
             <div>
        <button
          type="button"
          onClick={handleCheckEmail}
          className="self-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          이메일 중복 확인
        </button>
      </div>
  {/* 이메일 인증 요청 버튼 */}
  <div>
    <button
      type="button"
      className="mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={handleRequestEmailVerification}
    >
      이메일 인증 요청
    </button>
  </div>
          {/* 3. 인증코드 입력 */}
          <div>
            <label htmlFor="authCode" className="sr-only">인증코드</label>
            <input
              id="authCode"
              name="authCode"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="인증코드 입력"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
          </div>
          {/* 4. 인증코드 확인 버튼 */}
          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleVerifyEmailCode}
            >
              인증코드 확인
            </button>
          </div>
          {/* 5. 비밀번호 입력 */}
           <div>
        <label htmlFor="password" className="sr-only">비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="confirm-password" className="sr-only">비밀번호 확인</label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {!passwordsMatch && <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>}
      </div>
          {/* 7. 이름 입력 */}
          {/* 이하 생략, 순서에 맞춰 입력 필드 및 버튼 추가... */}
        </div>
        <div>
  <label htmlFor="name" className="sr-only">이름</label>
  <input
    id="name"
    name="name"
    type="text"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="이름"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</div>


<div className="flex flex-col space-y-2">
  <input
    id="nickname"
    name="nickname"
    type="text"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="닉네임"
    value={nickname}
    onChange={(e) => setNickname(e.target.value)}
  />
  <button
    type="button"
    onClick={handleCheckNickname}
    className="self-end py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    닉네임 중복 확인
  </button>
</div>

<div>
  <label htmlFor="address" className="sr-only">주소</label>
  <input
    id="address"
    name="address"
    type="text"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="주소"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
  />
</div>

<div>
  <label htmlFor="phone" className="sr-only">전화번호</label>
  <input
    id="phone"
    name="phone"
    type="tel"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="전화번호"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
  />
</div>


<div>
  <label htmlFor="age" className="sr-only">나이</label>
  <input
    id="age"
    name="age"
    type="text"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="나이"
    value={age}
    onChange={(e) => setAge(e.target.value)}
  />
</div>
<div className="rounded-md shadow-sm -space-y-px">
            {/* MBTI 입력 */}
            <div>
              <label htmlFor="mbti" className="sr-only">MBTI</label>
              <input
                id="mbti"
                name="mbti"
                type="text"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="MBTI (선택 사항)"
                value={mbti}
                onChange={(e) => setMbti(e.target.value)}
              />
            </div>

            {/* Instagram ID 입력 */}
            <div>
              <label htmlFor="instagramId" className="sr-only">Instagram ID</label>
              <input
                id="instagramId"
                name="instagramId"
                type="text"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Instagram ID (선택 사항)"
                value={instagramId}
                onChange={(e) => setInstagramId(e.target.value)}
              />
            </div>

            {/* 자기소개 입력 */}
            <div>
              <label htmlFor="description" className="sr-only">자기소개</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="자기소개 (선택 사항)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">프로필 이미지</label>
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
    className={`py-2 px-4 border border-transparent text-sm font-medium rounded-md ${gender === 'MALE' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'} focus:outline-none`}
  >
    남자
  </button>
  <button
    type="button"
    onClick={() => setGender('FEMALE')}
    className={`py-2 px-4 border border-transparent text-sm font-medium rounded-md ${gender === 'FEMAIL' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-900'} focus:outline-none`}
  >
    여자
  </button>
</div>
        {/* 닉네임 입력 및 중복 확인 */}
        {/* 주소 입력 */}
        {/* 전화번호 입력 */}
        {/* 나이 입력 */}
        {/* 성별 선택 버튼 (남자, 여자) */}
        {/* 가입하기 버튼 */}
        
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