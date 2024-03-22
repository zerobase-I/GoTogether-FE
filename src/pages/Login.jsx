import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { useQueryClient } from '@tanstack/react-query';
import { signIn, getUserDetails } from '/src/api/authService.js';
import { TokenAtom } from '../recoil/TokenAtom';
import { UserInfoAtom } from '../recoil/userInfoAtom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setAccessToken = useSetRecoilState(TokenAtom);
  const setUserInfo = useSetRecoilState(UserInfoAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const tokenState = useRecoilValue(TokenAtom);

  useEffect(() => {
    console.log('Recoil TokenAtom State:', tokenState);
  }, [tokenState]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn(email, password);
      if (data.accessToken) {
        const userDetails = await getUserDetails(data.accessToken);
        setUserInfo(userDetails);
        setAccessToken({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        queryClient.setQueryData(['userInfo'], userDetails);
        alert('로그인 완료 되었습니다.');
        navigate('/');
      } else {
        setError('로그인 실패: 인증 정보를 확인할 수 없습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      if (error.response && error.response.data) {
        setError(
          error.response.data.errorMessage || '로그인 중 오류가 발생했습니다.',
        );
      } else {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <Link to="/member">
          <div className="absolute left-6 top-14 w-5">
            <img src="/src/assets/left-arrow.png" alt="왼쪽 화살표" />
          </div>
        </Link>
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="ml-5 mt-14 text-3xl flex item-start font-extrabold text-gray-900">
              이메일로 로그인
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-full shadow-sm -space-y-px">
              <div>
                <p className="flex items-start text-blue-500 text-xs">
                  이메일 주소
                </p>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <p className="mt-28 flex items-start text-blue-500 text-xs">
                  비밀번호
                </p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="text-xl mb-2 relative block w-full px-3 py-1 border-b-2 border-gray-600 bg-transparent text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-5 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-500 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center items-center h-14 py-2 px-4 border-none text-xl font-medium rounded-md text-white bg-gray-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-black group-hover:text-blue-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4 8V6a4 4 0 118 0v2h1a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7a1 1 0 011-1h1zm4-3a2 2 0 10-4 0v2h4V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
