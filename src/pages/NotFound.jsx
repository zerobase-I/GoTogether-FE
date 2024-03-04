import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="hero min-h-screen bg-base-300">
      <div className="hero-content flex-col ">
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6">없는 페이지 입니다 😱</p>

          <Link to="">
            {' '}
            <button className="btn btn-primary">홈으로</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
