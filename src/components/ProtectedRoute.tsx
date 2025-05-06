import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "react-oauth2-code-pkce";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // Redirect to home if not authenticated
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute; 