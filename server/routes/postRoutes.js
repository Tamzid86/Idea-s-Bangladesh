const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const { updateBlog, deleteBlog } = require('../controllers/blogs');
const { createBlog, getBlogs, likeBlog, unlikeBlog } = require('../controllers/blogs');

router.post('/create-blog', upload.single('image'), createBlog);
router.get('/blogs', getBlogs);
router.put('/blogs/:id', upload.single('image'), updateBlog);
router.delete('/blogs/:id', deleteBlog);
router.post('/blogs/:id/like', likeBlog);
router.post('/blogs/:id/unlike', unlikeBlog);

module.exports = router;
