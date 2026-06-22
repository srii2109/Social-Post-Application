// models/Post.js - Post schema with likes and comments
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: [true, 'Comment cannot be empty'],
      trim: true,
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      trim: true,
      maxlength: [1000, 'Post text cannot exceed 1000 characters'],
    },
    image: {
      type: String,
      default: null,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        username: {
          type: String,
        },
      },
    ],
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

// Ensure at least text or image is provided
PostSchema.pre('validate', function (next) {
  if (!this.text && !this.image) {
    next(new Error('Post must have either text or image'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Post', PostSchema);