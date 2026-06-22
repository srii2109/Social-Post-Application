// components/LoadingSpinner.jsx - Reusable loading spinner
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ 
  message = 'Loading...', 
  size = 60,
  fullScreen = false,
}) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 4,
      }}
    >
      <CircularProgress
        size={size}
        sx={{
          color: 'primary.main',
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': { opacity: 0.5 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.5 },
          },
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
};

// Skeleton loader for posts
export const PostSkeleton = () => (
  <Box
    sx={{
      p: 3,
      mb: 3,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      animation: 'pulse 1.5s ease-in-out infinite',
      '@keyframes pulse': {
        '0%': { opacity: 0.6 },
        '50%': { opacity: 1 },
        '100%': { opacity: 0.6 },
      },
    }}
  >
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          bgcolor: 'rgba(0,0,0,0.1)',
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            width: '60%',
            height: 20,
            borderRadius: 1,
            bgcolor: 'rgba(0,0,0,0.1)',
            mb: 1,
          }}
        />
        <Box
          sx={{
            width: '40%',
            height: 14,
            borderRadius: 1,
            bgcolor: 'rgba(0,0,0,0.08)',
          }}
        />
      </Box>
    </Box>
    <Box
      sx={{
        width: '100%',
        height: 100,
        borderRadius: 2,
        bgcolor: 'rgba(0,0,0,0.05)',
        mb: 2,
      }}
    />
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box
        sx={{
          width: 60,
          height: 36,
          borderRadius: 2,
          bgcolor: 'rgba(0,0,0,0.08)',
        }}
      />
      <Box
        sx={{
          width: 60,
          height: 36,
          borderRadius: 2,
          bgcolor: 'rgba(0,0,0,0.08)',
        }}
      />
    </Box>
  </Box>
);

export default LoadingSpinner;