const express = require('express');
const router = express.Router();

const { getBlogs, getBlogById,getBanglaBlogs} = require('../controllers/blogs');
router.get('/blogs', getBlogs);
router.get('/blogs/bangla', getBanglaBlogs);
router.get('/blogs/:id', getBlogById);


module.exports = router;
