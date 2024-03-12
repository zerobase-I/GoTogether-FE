import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedInSelector } from '/src/Recoil/TokenAtom';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/member');
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default ProtectedRoute;