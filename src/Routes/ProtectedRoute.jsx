import React from 'react';
// import { useRecoilValue } from 'recoil';
// import { isLoginSelector } from '../Recoil/TokenAtom.js';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // const isLogin = useRecoilValue(isLoginSelector);
    const isLogin = false;
    // const navigate = useNavigate();

    return isLogin ? children: <Navigate to='/member'/>;
}

export default ProtectedRoute;