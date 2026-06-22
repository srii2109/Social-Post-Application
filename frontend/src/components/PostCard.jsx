import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  BookmarkBorder,
  Bookmark,
  MoreHoriz,
  Send,
  Verified,
  Repeat,
  BarChart,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import CommentSection from './CommentSection';

const PostCard = ({ post, onUpdate, onDelete }) => {
  const { user, api } = useAuth();
  const [liked, setLiked] = useState(
    post.likes?.some((like) => like.user === user?._id) || false
  );
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [saved, setSaved] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLiking, setIsLiking] = useState(false);
  const [isHeartPulse, setIsHeartPulse] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setIsHeartPulse(true);
    setTimeout(() => setIsHeartPulse(false), 500);
    try {
      const res = await api.put(`/posts/${post._id}/like`);
      const updated = res.data;
      setLiked(updated.likes.some((like) => like.user === user?._id));
      setLikeCount(updated.likes.length);
      onUpdate(updated);
    } catch {
      toast.error('Failed to like');
    } finally {
      setIsLiking(false);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? 'Removed from saved' : 'Saved! 📌');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied! 📋');
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const isAuthor = post.user?._id === user?._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fade-up"
    >
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: '#111827',
          border: '1px solid rgba(255,255,255,0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.12)',
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          },
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                  cursor: 'pointer',
                }}
              >
                {post.username?.charAt(0).toUpperCase()}
              </Avatar>
            </motion.div>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    '&:hover': { color: '#818cf8' },
                  }}
                >
                  {post.username}
                </Typography>
                <Verified sx={{ fontSize: 16, color: '#6366f1' }} />
                {isAuthor && (
                  <Chip
                    label="You"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.55rem',
                      bgcolor: 'rgba(99,102,241,0.15)',
                      color: '#818cf8',
                      fontWeight: 600,
                      ml: 0.5,
                    }}
                  />
                )}
              </Box>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 1 }}>
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                <Box component="span" sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: '#94A3B8' }} />
                <span>Twitter for Web</span>
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={handleSave}
                size="small"
                sx={{ color: '#94A3B8', '&:hover': { color: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)' } }}
              >
                {saved ? <Bookmark sx={{ color: '#6366f1' }} /> : <BookmarkBorder />}
              </IconButton>
            </motion.div>
            <IconButton
              onClick={handleMenuOpen}
              size="small"
              sx={{ color: '#94A3B8', '&:hover': { color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.05)' } }}
            >
              <MoreHoriz />
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        {post.text && (
          <Typography
            variant="body1"
            sx={{ mb: 2, whiteSpace: 'pre-wrap', lineHeight: 1.8, color: '#FFFFFF', fontSize: '1rem' }}
          >
            {post.text}
          </Typography>
        )}

        {post.image && (
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Box sx={{ borderRadius: 3, overflow: 'hidden', mb: 2, background: 'rgba(255,255,255,0.02)' }}>
              <img
                src={`http://localhost:5000${post.image}`}
                alt="Post"
                style={{ width: '100%', maxHeight: 500, objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </Box>
          </motion.div>
        )}

        {/* Engagement Preview */}
        <Box sx={{ display: 'flex', gap: 3, mb: 1.5 }}>
          {likeCount > 0 && (
            <Typography variant="caption" sx={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              ❤️ {likeCount} {likeCount === 1 ? 'like' : 'likes'}
            </Typography>
          )}
          {post.comments?.length > 0 && (
            <Typography variant="caption" sx={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              💬 {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
            </Typography>
          )}
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            pt: 1.5,
            mt: 0.5,
          }}
        >
          <Tooltip title={liked ? 'Unlike' : 'Like'}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.85 }}>
              <Button
                startIcon={
                  liked ? (
                    <motion.div
                      className={isHeartPulse ? 'heartbeat' : ''}
                    >
                      <Favorite sx={{ color: '#ef4444' }} />
                    </motion.div>
                  ) : (
                    <FavoriteBorder sx={{ color: '#94A3B8' }} />
                  )
                }
                onClick={handleLike}
                sx={{
                  color: liked ? '#ef4444' : '#94A3B8',
                  borderRadius: 50,
                  '&:hover': { backgroundColor: 'rgba(239,68,68,0.08)' },
                }}
              >
                {likeCount > 0 && <Typography variant="body2" sx={{ fontWeight: 600, ml: 0.5 }}>{likeCount}</Typography>}
              </Button>
            </motion.div>
          </Tooltip>

          <Button
            startIcon={<Comment sx={{ color: '#94A3B8' }} />}
            onClick={() => setShowComments(!showComments)}
            sx={{ color: '#94A3B8', borderRadius: 50, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}
          >
            {post.comments?.length > 0 && <Typography variant="body2" sx={{ fontWeight: 600, ml: 0.5 }}>{post.comments.length}</Typography>}
          </Button>

          <Button
            startIcon={<Repeat sx={{ color: '#94A3B8' }} />}
            sx={{ color: '#94A3B8', borderRadius: 50, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, ml: 0.5 }}>24</Typography>
          </Button>

          <Button startIcon={<BarChart sx={{ color: '#94A3B8' }} />} sx={{ color: '#94A3B8', borderRadius: 50, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }} />
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
            <Button startIcon={<Share sx={{ color: '#94A3B8' }} />} onClick={handleShare} sx={{ color: '#94A3B8', borderRadius: 50, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }} />
          </motion.div>
          
          <Button startIcon={<Send sx={{ color: '#94A3B8' }} />} sx={{ color: '#94A3B8', borderRadius: 50, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }} />
        </Box>

        <CommentSection post={post} onUpdate={onUpdate} expanded={showComments} onToggle={() => setShowComments(!showComments)} />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: '#1F2937',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 3,
              minWidth: 180,
            },
          }}
        >
          {isAuthor && (
            <MenuItem
              onClick={() => { handleMenuClose(); onDelete(post._id); }}
              sx={{ color: '#ef4444', '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' } }}
            >
              Delete Post
            </MenuItem>
          )}
          <MenuItem onClick={handleMenuClose} sx={{ color: '#CBD5E1', '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>Report</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: '#CBD5E1', '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>Copy Link</MenuItem>
        </Menu>
      </Paper>
    </motion.div>
  );
};

export default PostCard;