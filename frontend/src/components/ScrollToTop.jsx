// components/ScrollToTop.jsx - Enhanced scroll to top button
import React, { useState, useEffect } from 'react';
import { Fab, Zoom, Tooltip, Badge } from '@mui/material';
import { KeyboardArrowUp, KeyboardDoubleArrowUp } from '@mui/icons-material';

const ScrollToTop = ({ threshold = 300 }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setVisible(scrollTop > threshold);
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToTopFast = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Zoom in={visible}>
        <Tooltip title="Scroll to top" placement="left">
          <Fab
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: { xs: 100, sm: 30 },
              right: 20,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              },
              zIndex: 999,
              transition: 'all 0.3s ease',
            }}
            size="medium"
          >
            <KeyboardArrowUp />
          </Fab>
        </Tooltip>
      </Zoom>

      {/* Progress indicator */}
      {visible && (
        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: 160, sm: 90 },
            right: 20,
            zIndex: 998,
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: '0.7rem',
            }}
          >
            {Math.round(progress)}%
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ScrollToTop;