import React from 'react';
import { Fab, Zoom } from '@mui/material';
import { Add } from '@mui/icons-material';

const FloatingActionButton = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <Zoom in={visible}>
      <Fab
        onClick={() => {
          const createPost = document.querySelector('[data-create-post]');
          if (createPost) {
            createPost.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          color: 'white',
          width: 56,
          height: 56,
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)',
          },
          display: { xs: 'flex', md: 'none' },
        }}
      >
        <Add />
      </Fab>
    </Zoom>
  );
};

export default FloatingActionButton;