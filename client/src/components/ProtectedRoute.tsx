import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {type JSX } from "react";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }:Props) => {
  const token = Cookies.get("token");
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
};

export default ProtectedRoute;

