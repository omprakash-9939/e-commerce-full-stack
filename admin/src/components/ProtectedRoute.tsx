import { Navigate } from "react-router-dom";
import {type JSX } from "react";

type ProtectedRouteProps = {
  token: string | null;
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
