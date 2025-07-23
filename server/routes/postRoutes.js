const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const { updateBlog, deleteBlog, getAllCategories } = require('../controllers/blogs');
const { createBlog, getBlogs, likeBlog, unlikeBlog, createCategory, deleteCategory, getCategoryById, showAllSubscribers, showSubscriberNumber } = require('../controllers/blogs');
const { route } = require('./postRoutes');

router.post('/create-blog', upload.single('image'), createBlog);
router.get('/blogs', getBlogs);
router.put('/blogs/:id', upload.single('image'), updateBlog);
router.delete('/blogs/:id', deleteBlog);
router.post('/blogs/:id/like', likeBlog);
router.post('/blogs/:id/unlike', unlikeBlog);

router.post('/category', createCategory);
router.delete('/category/:id', deleteCategory);
router.get('/category/:id', getCategoryById);
router.get('/category', getAllCategories);

router.get('/subscribers', showAllSubscribers);
router.get('/subscribers/count', showSubscriberNumber);

module.exports = router;
