const express = require('express');
const router = express.Router();
const mainImageUpload = require("../middleware/upload"); 
const {
  updateBlog,
  deleteBlog,
  getAllCategories,
  createBlog,
  getBlogs,
  createCategory,
  deleteCategory,
  getCategoryById,
  showAllSubscribers,
  showSubscriberNumber
} = require('../controllers/blogs');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/create-blog', mainImageUpload.single('image'), createBlog);
router.get('/blogs', getBlogs);
router.put('/blogs/:id', mainImageUpload.single('image'), updateBlog);
router.delete('/blogs/:id', deleteBlog);

router.post('/category', createCategory);
router.delete('/category/:id', deleteCategory);
router.get('/category/:id', getCategoryById);
router.get('/category', getAllCategories);

router.get('/subscribers', showAllSubscribers);
router.get('/subscribers/count', showSubscriberNumber);

// Using memory storage because we're uploading directly to Cloudinary
const inlineUpload = multer({ storage: multer.memoryStorage() });

router.post('/upload-inline-image', inlineUpload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'blog-inline-images' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);
    res.status(200).json({ location: result.secure_url }); // TinyMCE expects {location: url}
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Cloudinary upload failed' });
  }
});

module.exports = router;
