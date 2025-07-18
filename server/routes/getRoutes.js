const express = require('express');
const router = express.Router();

const { getBlogs } = require('../controllers/blogs');
router.get('/blogs', getBlogs);

module.exports = router;
