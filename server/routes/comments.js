const express = require('express');
const Comment = require('../models/Comment.js');

const router = express.Router();

// POST /comments - add new comment
router.post('/', async (req, res) => {
  const { blogId, name, email, content } = req.body;
  if (!blogId || !name || !email || !content) return res.status(400).json({ error: 'All fields required' });

  try {
    const newComment = new Comment({ blogId, name, email, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /comments/:blogId - get all comments for a blog
router.get('/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
