import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Explore, Favorite, Person, AddBox, Chat } from '@mui/icons-material';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'Home', icon: <Home />, path: '/' },
    { label: 'Explore', icon: <Explore />, path: '/explore' },
    { label: 'Post', icon: <AddBox />, path: '/', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Messages', icon: <Chat />, path: '/messages' },
    { label: 'Profile', icon: <Person />, path: '/profile' },
  ];

  const currentTab = tabs.findIndex(tab => tab.path === location.pathname);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ display: { xs: 'block', md: 'none' }, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <Paper
        elevation={8}
        sx={{
          background: 'rgba(11,16,32,0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 0,
        }}
      >
        <BottomNavigation
          value={currentTab === -1 ? 0 : currentTab}
          onChange={(_, newValue) => {
            if (tabs[newValue].action) { tabs[newValue].action(); } else { navigate(tabs[newValue].path); }
          }}
          sx={{
            height: 65,
            bgcolor: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              color: '#94A3B8',
              '&.Mui-selected': { color: '#6366f1' },
            },
          }}
        >
          {tabs.map((tab, i) => (
            <BottomNavigationAction key={i} label={tab.label} icon={tab.icon} />
          ))}
        </BottomNavigation>
      </Paper>
    </motion.div>
  );
};

export default BottomNav;