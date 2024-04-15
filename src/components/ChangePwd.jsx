import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { changePassword,requestEmailCertification,verifyEmailCode } from '/src/api/member.js';  // API 함수 임포트
import signUpAPI from '/src/api/signUpAPI.js';

function ChangePwd() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [validationPassword, setValidationPassword] = useState('');
    const [message, setMessage] = useState('');
     const [isEmailAvailable, setIsEmailAvailable] = useState('');
  const [passwordError, setPasswordError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [isEmailChecked, setIsEmailChecked] = useState('');
    const [verifiedEmail, setVerifiedEmail] = useState('');
    
    const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,20}$/;
    return regex.test(password);
    };

    useEffect(() => {
    const isValidPassword = validatePassword(newPassword);
    if (!isValidPassword) {
      setPasswordError('영문, 숫자, 특수문자를 포함한 10~20자리여야 합니다.');
    } else {
      setPasswordError('');
    }
    setPasswordsMatch(newPassword === validationPassword);
    }, [newPassword, validationPassword]);
    
    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleCodeChange = (e) => setCode(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleValidationPasswordChange = (e) => setValidationPassword(e.target.value);
    
    const handleEmailCertification = async () => {
    try {
      const result = await requestEmailCertification(email);
        setMessage(`Verification code sent to ${result.email}. Please check your email.`);
        alert('인증 메일이 발송되었습니다. 메일을 확인해 주세요.');
    } catch (error) {
        alert('이메일 인증 요청에 실패했습니다.');
    }
  };
    
    
   const handleVerifyEmailCode = async () => {
  try {
    const isValid = await signUpAPI.verifyEmailCode(email, code);
    if (isValid) {
      alert('이메일이 성공적으로 인증되었습니다.');
      setVerifiedEmail(email); // 이메일 인증 성공 했을 때, 인증된 이메일로 업데이트
    } else {
      alert('이메일 인증에 실패했습니다.');
    }
  } catch (error) {
    console.error('이메일 인증 실패:', error);
    alert('이메일 인증에 실패했습니다.');
  }
};
    
    const handleCheckEmail = async () => {
    try {
      const response = await signUpAPI.checkEmail(email);
      const isAvailable = response.data;
      console.log(response.data);
      setIsEmailAvailable(isAvailable);
      setIsEmailChecked(isAvailable ? false : true);
      if (isAvailable) {
      alert('비밀 번호 변경 가능한 이메일입니다.');
    } else {
      alert('없는 계정입니다. 회원가입을 진행 해주세요.');
      navigate('/member/signup'); // 사용자를 회원가입 페이지로 리디렉트
    }
  } catch (error) {
    console.error('이메일 중복 체크 실패:', error);
  }
};

  const handleChangePassword = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작을 막음
    if (newPassword !== validationPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const success = await changePassword(email, newPassword, validationPassword);
      if (success) {
        alert("성공적으로 비밀번호를 변경 했습니다.");
        navigate('/member/login');
      } else {
        console.log('비밀번호 변경 실패');
      }
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
    }
  };

  return (
    <div className="min-h-screen ml-5 mr-5 bg-white flex flex-col justify-start py-12 sm:px-6 lg:px-8">
      <Link to="/member">
        <div className="left-6 top-14 w-5">
          <img src="/src/assets/left-arrow.png" alt="왼쪽 화살표" />
        </div>
      </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="ml-5 mt-14 text-3xl flex item-start font-extrabold text-gray-900">
          이메일로 회원가입
        </h2>

        <form className="mt-8  space-y-6" onSubmit={handleChangePassword}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <div>
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
                  className="relative appearance-none rounded-none block m-auto w-full mb-3 px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              {!isEmailChecked && (
                <span className="text-blue-500 absolute top-10 right-5">
                  ✔
                </span>
              )}
                      </div>
                      
                      
         <div>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center py-2 px-4 mb-7 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-500"
                onClick={handleEmailCertification}
                disabled={isEmailChecked}
              >
                이메일 인증 요청
              </button>
            </div>
                      
          <h2 className="flex ml-3 text-xl pt-3 text-blue-500">이메일 인증코드</h2>
                      
          <div>
            <label htmlFor="authCode" className="sr-only">Verification Code</label>
            <input
              id="authCode"
              name="authCode"
              type="text"
              required
              className="appearance-none rounded-none block w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="인증코드를 입력해주세요"
              value={code}
              onChange={handleCodeChange}
            />
           </div>
           <div>
              <button
                type="button"
                disabled={!code.trim()}
                className="mt-3 w-full m-auto mb-7 flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-500"
                onClick={handleVerifyEmailCode}
              >
                인증코드 확인
              </button>
            </div>
                      <div>
                          <h2 className="flex ml-3 text-xl pt-3 text-blue-500">새로운 비밀번호</h2>
            <label htmlFor="newPassword" className="sr-only">새 비밀번호</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              className="appearance-none rounded-none block w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="새로운 비밀번호"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <p className={`text-xs ${passwordError ? 'text-red-500' : 'text-gray-500'} text-right mb-7`}>
              {passwordError || '영문, 숫자, 특수문자를 포함한 10~20자리여야 합니다.'}
            </p>
          </div>
          <div>
            <label htmlFor="validationPassword" className="sr-only">Confirm New Password</label>
            <input
              id="validationPassword"
              name="validationPassword"
              type="password"
              required
              className="appearance-none rounded-none block w-full px-3 py-3 border-b-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="새 비밀번호 재확인"
              value={validationPassword}
              onChange={handleValidationPasswordChange}
            />
            {!passwordsMatch && (
              <p className="text-xs text-red-500 text-right mb-7">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>
        </div>
        
        
        <button
          type="submit"
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500"
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  </div>
);
}

export default ChangePwd;