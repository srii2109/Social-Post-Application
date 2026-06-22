import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  CheckCircle,
  Google,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const RegisterForm = ({ setIsLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password') calcStrength(value);
  };

  const calcStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[$@#&!]/.test(pwd)) score++;
    setStrength((score / 5) * 100);
  };

  const getColor = () => {
    if (strength < 20) return '#ef4444';
    if (strength < 40) return '#f59e0b';
    if (strength < 60) return '#eab308';
    if (strength < 80) return '#22c55e';
    return '#22c55e';
  };

  const getLabel = () => {
    if (strength < 20) return 'Weak';
    if (strength < 40) return 'Fair';
    if (strength < 60) return 'Good';
    if (strength < 80) return 'Strong';
    return 'Very Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    const result = await register(
      formData.username,
      formData.email,
      formData.password
    );
    setLoading(false);
    if (result.success) {
      toast.success('Account created! 🎉');
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
          Create Account
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}
        >
          Join the community today
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
            label="Username"
            name="username"
            value={formData.username}
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
                  <Person style={{ color: 'rgba(255,255,255,0.25)' }} />
                </InputAdornment>
              ),
            }}
          />
        </motion.div>

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

          {formData.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: 8 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{getLabel()}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: getColor() }}>
                  {Math.round(strength)}%
                </span>
              </div>
              <LinearProgress
                variant="determinate"
                value={strength}
                sx={{
                  height: 3,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getColor(),
                    borderRadius: 4,
                    transition: 'width 0.5s ease',
                  },
                }}
              />
            </motion.div>
          )}
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginBottom: 20 }}>
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
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
              endAdornment: formData.confirmPassword && (
                <InputAdornment position="end">
                  {formData.password === formData.confirmPassword ? (
                    <CheckCircle style={{ color: '#22c55e' }} />
                  ) : (
                    <Lock style={{ color: 'rgba(255,255,255,0.25)' }} />
                  )}
                </InputAdornment>
              ),
            }}
          />
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
            {loading ? 'Creating Account...' : 'Create Account'}
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
          Already have an account?{' '}
          <span
            onClick={() => setIsLogin(true)}
            style={{
              color: '#818cf8',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#a5b4fc')}
            onMouseLeave={(e) => (e.target.style.color = '#818cf8')}
          >
            Sign In
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RegisterForm;