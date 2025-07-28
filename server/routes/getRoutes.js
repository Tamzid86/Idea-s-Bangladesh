const express = require('express');
const router = express.Router();

const { getBlogs, getBlogById,getBanglaBlogs, getEnglishBlogs} = require('../controllers/blogs');
router.get('/blogs', getBlogs);
router.get('/blogs/english', getEnglishBlogs);
router.get('/blogs/bangla', getBanglaBlogs);
router.get('/blogs/:id', getBlogById);



module.exports = router;
