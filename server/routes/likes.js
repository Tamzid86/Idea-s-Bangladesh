const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// POST /api/blogs/:id/like
router.post('/blogs/:id/like', async (req, res) => {
    const { email } = req.body;
    const blogId = req.params.id;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        if (!Array.isArray(blog.likedBy)) blog.likedBy = [];

        const hasLiked = blog.likedBy.includes(email);

        if (hasLiked) {
            blog.likes = Math.max(0, blog.likes - 1);
            blog.likedBy = blog.likedBy.filter((e) => e !== email);
        } else {
            blog.likes += 1;
            blog.likedBy.push(email);
        }

        await blog.save();

        res.status(200).json({
            likes: blog.likes,
            liked: !hasLiked,
            likedBy: blog.likedBy,
            message: hasLiked ? 'Like removed' : 'Like added'
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});


module.exports = router;
