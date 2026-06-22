import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';

const CommentSection = ({ post, onUpdate, expanded, onToggle }) => {
  const { user, api } = useAuth();
  const [comments, setComments] = useState(post.comments || []);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('Write something');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post(`/posts/${post._id}/comments`, {
        text: text.trim(),
      });
      const updated = res.data;
      setComments(updated.comments);
      setText('');
      onUpdate(updated);
      toast.success('Comment added!');
    } catch {
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  if (!expanded) {
    return (
      <Button
        onClick={onToggle}
        size="small"
        sx={{
          color: '#94A3B8',
          mt: 1,
          '&:hover': {
            color: '#FFFFFF',
          },
        }}
      >
        View all {comments.length} comments
      </Button>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        pt: 2,
      }}
    >
      <AnimatePresence>
        {comments.map((comment, index) => (
          <motion.div
            key={comment._id || index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: index * 0.05 }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                mb: 1.5,
                p: 1.5,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.02)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.04)',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: 'rgba(99,102,241,0.15)',
                  fontSize: '0.8rem',
                  color: '#FFFFFF',
                }}
              >
                {comment.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      color: '#FFFFFF',
                    }}
                  >
                    {comment.username}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#94A3B8',
                    }}
                  >
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 0.5,
                    color: '#CBD5E1',
                  }}
                >
                  {comment.text}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>

      <Box
        component="form"
        onSubmit={handleAdd}
        sx={{
          display: 'flex',
          gap: 1,
          mt: 1,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: 'rgba(99,102,241,0.15)',
            fontSize: '0.8rem',
            color: '#FFFFFF',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <TextField
          size="small"
          fullWidth
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 50,
              backgroundColor: 'rgba(255,255,255,0.02)',
              '& fieldset': {
                borderColor: 'rgba(255,255,255,0.08)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255,255,255,0.15)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6366f1',
              },
            },
            '& .MuiInputBase-input': {
              color: '#FFFFFF',
            },
          }}
        />
        <IconButton
          type="submit"
          disabled={loading || !text.trim()}
          sx={{
            backgroundColor: 'rgba(99,102,241,0.15)',
            color: '#818cf8',
            '&:hover': {
              backgroundColor: 'rgba(99,102,241,0.25)',
            },
          }}
        >
          {loading ? <CircularProgress size={20} /> : <Send />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default CommentSection;