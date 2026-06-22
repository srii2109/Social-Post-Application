import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Avatar, Chip, Button, Divider } from '@mui/material';
import { Whatshot, People, Verified } from '@mui/icons-material';

const RightSidebar = () => {
  const trendingTopics = [
    { tag: '#Tech2026', posts: '12.5K', growth: '+24%', icon: '🔥' },
    { tag: '#AI', posts: '8.2K', growth: '+18%', icon: '🤖' },
    { tag: '#StartupLife', posts: '5.7K', growth: '+12%', icon: '🚀' },
    { tag: '#Web3', posts: '4.3K', growth: '+8%', icon: '💎' },
  ];

  const suggestions = [
    { name: 'Alice Johnson', username: '@alicej', bio: '✨ Tech Enthusiast', followers: '12.5K', avatar: 'AJ', verified: true },
    { name: 'Bob Smith', username: '@bobsmith', bio: '🎨 Product Designer', followers: '8.2K', avatar: 'BS', verified: false },
    { name: 'Carol White', username: '@carolw', bio: '💻 Full Stack Dev', followers: '5.7K', avatar: 'CW', verified: true },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ position: 'sticky', top: 80, width: '100%' }}
    >
      <motion.div variants={itemVariants}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            mb: 2.5,
            background: '#111827',
            border: '1px solid rgba(255,255,255,0.06)',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.12)',
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Whatshot sx={{ color: '#ef4444' }} />
            </motion.div>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF' }}>Trending Now</Typography>
          </Box>

          {trendingTopics.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
            >
              <Box sx={{ py: 1.5, px: 1, borderRadius: 2, cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography sx={{ fontSize: 20 }}>{item.icon}</Typography>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.95rem' }}>{item.tag}</Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>{item.posts} posts</Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={item.growth}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(34,197,94,0.12)',
                      color: '#22c55e',
                    }}
                  />
                </Box>
                {index < trendingTopics.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.04)', mt: 1 }} />}
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: '#111827',
            border: '1px solid rgba(255,255,255,0.06)',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.12)',
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <People sx={{ color: '#6366f1' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF' }}>Who To Follow</Typography>
          </Box>

          {suggestions.map((person, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.5, px: 1, borderRadius: 2 }}>
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  {person.avatar}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.9rem' }}>{person.name}</Typography>
                    {person.verified && <Verified sx={{ fontSize: 14, color: '#6366f1' }} />}
                  </Box>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.75rem', display: 'block' }}>{person.bio}</Typography>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.65rem' }}>{person.followers} followers</Typography>
                </Box>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      borderRadius: 50,
                      fontSize: '0.7rem',
                      px: 2.5,
                      py: 0.5,
                      minWidth: 'auto',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    }}
                  >
                    Follow
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default RightSidebar;