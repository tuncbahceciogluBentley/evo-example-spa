import React, { useContext } from 'react';
import { AuthContext } from "react-oauth2-code-pkce";
import Login from '../components/Login';
import './Home.css';

const Home: React.FC = () => {
  const { error } = useContext(AuthContext);

  return (
    <div className="home-container">
      <h1>Seequent EVO explorer</h1>
      <div className="login-section">
        <Login />
      </div>
      {error && (
        <div className="error-container">
          <h3>Authentication Error</h3>
          <p>{typeof error === 'string' ? error : 'An error occurred during authentication.'}</p>
        </div>
      )}
    </div>
  );
};

export default Home; 