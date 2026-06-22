import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Avatar,
  TextField,
  Button,
  IconButton,
  LinearProgress,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import { PhotoCamera, Close, Send, Gif, Poll, LocationOn } from '@mui/icons-material';
import { toast } from 'react-toastify';

const CreatePost = ({ onPostCreated }) => {
  const { user, api } = useAuth();
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) {
      toast.error('Add text or image');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      if (text.trim()) formData.append('text', text);
      if (image) formData.append('image', image);
      await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setText('');
      handleRemoveImage();
      toast.success('Post created! 🎉');
      onPostCreated();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: '#111827',
          border: '1px solid rgba(255,255,255,0.06)',
          transition: 'all 0.3s ease',
          maxHeight: imagePreview ? 'auto' : '140px',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.12)',
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              flexShrink: 0,
            }}
          >
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              placeholder="What's on your mind?"
              multiline
              rows={imagePreview ? 2 : 1}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.02)',
                  '& textarea': { color: '#FFFFFF', fontSize: '0.95rem' },
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.06)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
              }}
            />

            <AnimatePresence>
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{ position: 'relative', marginTop: 12 }}
                >
                  <Box sx={{ borderRadius: 2, overflow: 'hidden', maxHeight: 200 }}>
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto', maxHeight: 200, objectFit: 'cover' }} />
                  </Box>
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' },
                    }}
                    size="small"
                  >
                    <Close />
                  </IconButton>
                </motion.div>
              )}
            </AnimatePresence>

            {loading && <LinearProgress sx={{ mt: 1, borderRadius: 2 }} />}

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 1.5 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} ref={fileInputRef} />
                <IconButton onClick={() => fileInputRef.current?.click()} sx={{ color: '#94A3B8', '&:hover': { color: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)' } }}>
                  <PhotoCamera sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton sx={{ color: '#94A3B8', '&:hover': { color: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)' } }}>
                  <Gif sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton sx={{ color: '#94A3B8', '&:hover': { color: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)' } }}>
                  <Poll sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton sx={{ color: '#94A3B8', '&:hover': { color: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)' } }}>
                  <LocationOn sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading || (!text.trim() && !image)}
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    py: 0.8,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: '#FFFFFF',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(99,102,241,0.4)',
                    },
                  }}
                  endIcon={<Send sx={{ fontSize: 18 }} />}
                >
                  Post
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default CreatePost;