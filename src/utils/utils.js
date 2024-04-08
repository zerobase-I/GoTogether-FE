import { useNavigate } from 'react-router-dom';

/* 공통 함수들 모음 file */
export const useGoToPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goToAlarm = () => {
    navigate('/alarm');
  };

  return { navigate, goToHome, goToAlarm };
};
