import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "react-oauth2-code-pkce";
import './SignInOidc.css';

const SignInOidc: React.FC = () => {
  const { token, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status and redirect accordingly
    if (token) {
      // If we have a token, redirect to dashboard
      navigate('/dashboard');
    } else if (error) {
      // If we have an error, redirect to home
      navigate('/');
    }
    // If neither token nor error, stay on this page (loading state)
  }, [token, error, navigate]);

  return (
    <div className="signin-oidc-container">
      <h2>Processing Authentication</h2>
      <div className="loading-spinner"></div>
      <p>Please wait while we complete the authentication process...</p>
    </div>
  );
};

export default SignInOidc; 