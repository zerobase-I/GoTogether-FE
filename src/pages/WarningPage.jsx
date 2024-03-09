import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

    
    
  return (
    <div className="hero min-h-screen bg-base-300">
      <h1>Warning: You are not logged in!</h1>
      <p>Please log in or sign up to access this page.</p>

          <Link to="/authpage">
            {' '}
            <button className="btn btn-primary">홈으로</button>
          </Link>
        </div>
  );
};

export default NotFound;
