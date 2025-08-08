import React from 'react';
import './header.css';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate() ;
  return (
    <header className="header">
      <div className="logo">DSA-Test-App</div>
      <div className="auth-buttons">
        <button className="login-btn" onClick={() => {
          navigate("/login") ; 
        }}>Login</button>
        <button className="signup-btn" onClick={() => {
          navigate("/signup") ; 
        }}>Sign Up</button>
      </div>
    </header>
  );
}

export default Header;