import React from 'react';
// import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../Recoil/personalToken.js';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // const isLogin = useRecoilValue(isLoginSelector);
    const isLogin = true;
    // const navigate = useNavigate();

    return isLogin ? children: <Navigate to='/member'/>;
}

export default ProtectedRoute;