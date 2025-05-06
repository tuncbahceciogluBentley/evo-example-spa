import React, { useContext } from 'react';
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";
import './Login.css';

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const { logIn } = useContext<IAuthContext>(AuthContext);

  const handleLogin = async () => {
    try {
      await logIn();
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <button
        onClick={handleLogin}
        className="login-button"
      >
        Login
      </button>
    </div>
  );
};

export default Login;