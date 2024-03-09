import { Navigate, useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../Recoil/TokenAtom";
import App from './App.tsx';

const ProtectedRoute = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  const currentLocation = useLocation();
  
  return isLogin ? (
    <App />
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ redirecredFrom: currentLocation }}
    />
  );
};

export default ProtectedRoute;