// components/MobileNav.jsx - Complete mobile navigation
import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Fab,
} from '@mui/material';
import {
  Home,
  AddBox,
  Favorite,
  Person,
  Chat,
  Search,
  Notifications,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [value, setValue] = useState(0);

  const handleNavigation = (path, index) => {
    setValue(index);
    if (path === 'post') {
      // Scroll to create post
      const createPostElement = document.querySelector('[data-create-post]');
      if (createPostElement) {
        createPostElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      toast.info('Create a new post! ✍️');
      return;
    }
    if (path) {
      navigate(path);
    }
  };

  const navItems = [
    { label: 'Home', icon: <Home />, path: '/' },
    { label: 'Explore', icon: <Search />, path: '/explore' },
    { label: 'Post', icon: <AddBox />, path: 'post', isFab: true },
    { label: 'Activity', icon: <Favorite />, path: '/activity' },
    { label: 'Profile', icon: <Person />, path: '/profile' },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: 'block', md: 'none' },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 0,
          position: 'relative',
        }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            handleNavigation(navItems[newValue].path, newValue);
          }}
          sx={{
            height: 65,
            background: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              color: '#666',
              '&.Mui-selected': {
                color: '#667eea',
              },
            },
          }}
        >
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={
                item.isFab ? (
                  <Fab
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      mt: -3,
                      width: 56,
                      height: 56,
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(102,126,234,0.4)',
                    }}
                  >
                    <AddBox sx={{ fontSize: 32 }} />
                  </Fab>
                ) : (
                  item.icon
                )
              }
              sx={{
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.65rem',
                  fontWeight: 500,
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default MobileNav;