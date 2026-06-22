import React from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import { Add, Circle } from '@mui/icons-material';

const stories = [
  { name: 'Your Story', img: 'https://i.pravatar.cc/150?img=1', isUser: true, online: true },
  { name: 'Alice', img: 'https://i.pravatar.cc/150?img=2', online: true },
  { name: 'Bob', img: 'https://i.pravatar.cc/150?img=3', online: false },
  { name: 'Carol', img: 'https://i.pravatar.cc/150?img=4', online: true },
  { name: 'Dave', img: 'https://i.pravatar.cc/150?img=5', online: true },
  { name: 'Eve', img: 'https://i.pravatar.cc/150?img=6', online: false },
  { name: 'Frank', img: 'https://i.pravatar.cc/150?img=7', online: true },
  { name: 'Grace', img: 'https://i.pravatar.cc/150?img=8', online: true },
  { name: 'Henry', img: 'https://i.pravatar.cc/150?img=9', online: false },
];

const Stories = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2.5,
        overflowX: 'auto',
        py: 2.5,
        px: 1,
        mb: 2,
        '&::-webkit-scrollbar': { display: 'none' },
        scrollBehavior: 'smooth',
      }}
    >
      {stories.map((story, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
          }}
        >
          <Box sx={{ position: 'relative' }}>
            {story.isUser ? (
              <>
                <Avatar
                  src={story.img}
                  sx={{
                    width: 72,
                    height: 72,
                    border: '2px solid rgba(255,255,255,0.1)',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    backgroundColor: '#6366f1',
                    color: 'white',
                    width: 24,
                    height: 24,
                    padding: 0,
                    border: '2px solid #0B1020',
                    '&:hover': {
                      backgroundColor: '#818cf8',
                      transform: 'scale(1.1)',
                    },
                  }}
                  size="small"
                >
                  <Add sx={{ fontSize: 16 }} />
                </IconButton>
              </>
            ) : (
              <>
                <div className="story-ring">
                  <Avatar
                    src={story.img}
                    sx={{
                      width: 72,
                      height: 72,
                      border: '2px solid transparent',
                    }}
                  />
                </div>
                {story.online && (
                  <Circle
                    sx={{
                      position: 'absolute',
                      bottom: 2,
                      right: 4,
                      fontSize: 14,
                      color: '#22c55e',
                      border: '2px solid #0B1020',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </>
            )}
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: '#94A3B8',
              fontSize: '0.7rem',
              textAlign: 'center',
              maxWidth: 72,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {story.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Stories;