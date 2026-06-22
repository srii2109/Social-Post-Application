// routes/posts.js - Post CRUD with upload handling
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// ===== ENSURE UPLOADS FOLDER EXISTS =====
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('📁 Uploads folder created from posts route');
}

// ===== CONFIGURE MULTER FOR FILE UPLOADS =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename: timestamp + random + original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|bmp|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('❌ Only images are allowed (jpeg, jpg, png, gif, webp, bmp, svg)'));
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// ===== ROUTES =====

// @route   POST /api/posts
// @desc    Create a new post with optional image
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { text } = req.body;
    
    // Get image path if uploaded
    let image = null;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
      console.log('📸 Image uploaded:', image);
    }

    // Validate: must have text OR image
    if (!text && !image) {
      return res.status(400).json({ 
        error: 'Post must have either text or image' 
      });
    }

    // Create post
    const post = new Post({
      user: req.user._id,
      username: req.user.username,
      text: text || '',
      image: image
    });

    await post.save();

    // Populate user details
    const populatedPost = await Post.findById(post._id)
      .populate('user', 'username email')
      .populate('comments.user', 'username');

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('❌ Create post error:', error);
    
    // Delete uploaded file if post creation fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/posts
// @desc    Get all posts with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'username email')
      .populate('comments.user', 'username');

    const total = await Post.countDocuments();

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasMore: page < Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('❌ Get posts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/posts/:id/like
// @desc    Like or unlike a post
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const likeIndex = post.likes.findIndex(
      (like) => like.user.toString() === req.user._id.toString()
    );

    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push({
        user: req.user._id,
        username: req.user.username
      });
    }

    await post.save();
    const updatedPost = await Post.findById(post._id)
      .populate('user', 'username email')
      .populate('comments.user', 'username');

    res.json(updatedPost);
  } catch (error) {
    console.error('❌ Like error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/posts/:id/comments
// @desc    Add a comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({
      user: req.user._id,
      username: req.user.username,
      text: text.trim()
    });

    await post.save();
    const updatedPost = await Post.findById(post._id)
      .populate('user', 'username email')
      .populate('comments.user', 'username');

    res.json(updatedPost);
  } catch (error) {
    console.error('❌ Comment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user is author
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You can only delete your own posts' });
    }

    // Delete associated image file
    if (post.image) {
      const imagePath = path.join(__dirname, '..', post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log('🗑️ Deleted image:', post.image);
      }
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('❌ Delete post error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;