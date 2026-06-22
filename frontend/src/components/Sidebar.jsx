import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Avatar,
  Typography,
} from '@mui/material';
import {
  Home,
  Explore,
  Notifications,
  Person,
  Logout,
  Bookmark,
  Whatshot,
  Settings,
  Chat,
  Verified,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: <Home sx={{ fontSize: 24 }} />, label: 'Home', path: '/' },
    { icon: <Whatshot sx={{ fontSize: 24 }} />, label: 'Trending', path: '/trending' },
    { icon: <Explore sx={{ fontSize: 24 }} />, label: 'Explore', path: '/explore' },
    { icon: <Chat sx={{ fontSize: 24 }} />, label: 'Messages', path: '/messages' },
    { icon: <Badge badgeContent={5} color="error"><Notifications sx={{ fontSize: 24 }} /></Badge>, label: 'Notifications', path: '/notifications' },
    { icon: <Bookmark sx={{ fontSize: 24 }} />, label: 'Bookmarks', path: '/bookmarks' },
    { icon: <Person sx={{ fontSize: 24 }} />, label: 'Profile', path: '/profile' },
    { icon: <Settings sx={{ fontSize: 24 }} />, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully 👋');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ position: 'sticky', top: 80, width: '100%' }}>
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box
          sx={{
            p: 2.5,
            mb: 2.5,
            borderRadius: 3,
            background: '#111827',
            border: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.12)',
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
            },
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <Avatar
              sx={{
                width: 72,
                height: 72,
                margin: '0 auto',
                mb: 1.5,
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                border: '2px solid rgba(255,255,255,0.1)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
          </motion.div>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>{user?.username}</Typography>
            <Verified sx={{ fontSize: 18, color: '#6366f1' }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>{user?.email}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1.1rem' }}>12</Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>Posts</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1.1rem' }}>243</Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>Followers</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1.1rem' }}>189</Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>Following</Typography>
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Navigation */}
      <Box
        sx={{
          borderRadius: 3,
          background: '#111827',
          border: '1px solid rgba(255,255,255,0.06)',
          p: 1,
        }}
      >
        <List sx={{ py: 0 }}>
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <ListItem
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  cursor: 'pointer',
                  backgroundColor: isActive(item.path) ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: isActive(item.path) ? '#818cf8' : '#CBD5E1',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#FFFFFF',
                    transform: 'translateX(6px)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 42 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '0.95rem',
                      fontWeight: isActive(item.path) ? 600 : 500,
                      color: 'inherit',
                    },
                  }}
                />
                {isActive(item.path) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Box sx={{ width: 4, height: 28, borderRadius: 2, background: 'linear-gradient(135deg, #6366f1, #ec4899)' }} />
                  </motion.div>
                )}
              </ListItem>
            </motion.div>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 1 }} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ListItem
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              cursor: 'pointer',
              color: '#94A3B8',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(239,68,68,0.1)',
                color: '#ef4444',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 42 }}><Logout sx={{ fontSize: 24 }} /></ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'inherit',
                },
              }}
            />
          </ListItem>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Sidebar;