import React from 'react';
import { Box, Skeleton } from '@mui/material';

const LoadingSkeleton = () => {
  return (
    <Box
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 4,
        bgcolor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={44} height={44} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton width="40%" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Box>
      </Box>
      <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)' }} />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Skeleton width={80} height={36} sx={{ borderRadius: 50, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton width={80} height={36} sx={{ borderRadius: 50, bgcolor: 'rgba(255,255,255,0.05)' }} />
      </Box>
    </Box>
  );
};

export default LoadingSkeleton;