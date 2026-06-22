import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import PostCard from './PostCard';
import Stories from './Stories';

const Feed = ({ refreshTrigger }) => {
  const { api } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchPosts = useCallback(async (pageNum = 1, append = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await api.get(`/posts?page=${pageNum}&limit=5`);
      if (res.data.posts.length === 0 && pageNum === 1) {
        setPosts([]);
        setHasMore(false);
      } else {
        if (append) {
          setPosts((prev) => [...prev, ...res.data.posts]);
        } else {
          setPosts(res.data.posts);
        }
        setHasMore(res.data.pagination.hasMore);
        setPage(pageNum);
      }
    } catch {
      setPosts([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [api, loading]);

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    fetchPosts(1, false);
  }, [refreshTrigger]);

  const handleUpdate = (updated) =>
    setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));

  const handleDelete = (id) =>
    setPosts((prev) => prev.filter((p) => p._id !== id));

  if (initialLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <CircularProgress sx={{ color: '#6366f1' }} />
        </motion.div>
      </Box>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box sx={{ textAlign: 'center', py: 8, px: 3, background: '#111827', borderRadius: 3, border: '1px solid rgba(255,255,255,0.06)' }}>
          <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 1, fontWeight: 600 }}>🌟 No posts yet</Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8' }}>Be the first to share something!</Typography>
        </Box>
      </motion.div>
    );
  }

  return (
    <Box>
      <Stories />
      {posts.map((post, index) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
        >
          <PostCard post={post} onUpdate={handleUpdate} onDelete={handleDelete} />
        </motion.div>
      ))}
      {hasMore && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => fetchPosts(page + 1, true)}
              disabled={loading}
              variant="outlined"
              sx={{
                color: '#94A3B8',
                borderColor: 'rgba(255,255,255,0.08)',
                '&:hover': { borderColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' },
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Load More'}
            </Button>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default Feed;