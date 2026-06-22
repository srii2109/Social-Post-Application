import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <motion.div
          className="brand-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="brand-content">
            <div className="logo">
              <span className="logo-icon">◆</span>
              <span className="logo-text">SocialHub</span>
            </div>
            <h1>Where <span className="gradient-text">Connections</span> Come Alive</h1>
            <p>Join millions of creators, friends, and communities sharing moments that matter.</p>
          </div>
        </motion.div>

        <motion.div
          className="form-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="form-container">
            <div className="toggle-container">
              <button
                className={`toggle-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Create Account
              </button>
            </div>
            <AnimatePresence mode="wait">
              {isLogin ? (
                <LoginForm key="login" setIsLogin={setIsLogin} />
              ) : (
                <RegisterForm key="register" setIsLogin={setIsLogin} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;