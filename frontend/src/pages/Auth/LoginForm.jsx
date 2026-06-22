import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TextField, Button, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Google } from '@mui/icons-material';
import { toast } from 'react-toastify';

const LoginForm = ({ setIsLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      toast.success('Welcome back! ✨');
      navigate('/');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 6 }}
        >
          Welcome Back
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}
        >
          Sign in to continue your journey
        </motion.p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="error" style={{ marginBottom: 20, borderRadius: 12 }}>
            {error}
          </Alert>
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <motion.div variants={itemVariants} style={{ marginBottom: 16 }}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 14,
                background: 'rgba(255,255,255,0.03)',
                transition: 'all 0.3s ease',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.06)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
              },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
              '& .MuiInputBase-input': { color: 'white' },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email style={{ color: 'rgba(255,255,255,0.25)' }} />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginBottom: 16 }}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 14,
                background: 'rgba(255,255,255,0.03)',
                transition: 'all 0.3s ease',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.06)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
                '&.Mui-focused fieldset': { borderColor: '#6366f1' },
              },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
              '& .MuiInputBase-input': { color: 'white' },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={{ color: 'rgba(255,255,255,0.25)' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'rgba(255,255,255,0.4)',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            <input type="checkbox" style={{ accentColor: '#6366f1', cursor: 'pointer' }} /> Remember me
          </label>
          <a
            href="#"
            style={{
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              fontSize: 13,
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.3)')}
          >
            Forgot password?
          </a>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: 14,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(99,102,241,0.35)' }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
            {loading && (
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: 'linear-gradient(90deg, transparent, white, transparent)',
                }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </motion.button>
        </motion.div>
      </form>

      <motion.div
        variants={itemVariants}
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '24px 0',
          gap: 16,
        }}
      >
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, textTransform: 'uppercase' }}>
          or continue with
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
      </motion.div>

      <motion.button
        variants={itemVariants}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: 14,
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14,
          background: 'rgba(255,255,255,0.02)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontFamily: 'Inter, sans-serif',
        }}
        whileHover={{
          background: 'rgba(255,255,255,0.05)',
          borderColor: 'rgba(255,255,255,0.12)',
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Google /> <span>Continue with Google</span>
      </motion.button>

      <motion.div variants={itemVariants} style={{ textAlign: 'center', marginTop: 24 }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
          Don't have an account?{' '}
          <span
            onClick={() => setIsLogin(false)}
            style={{
              color: '#818cf8',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#a5b4fc')}
            onMouseLeave={(e) => (e.target.style.color = '#818cf8')}
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;