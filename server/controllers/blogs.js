const Blog = require("../models/Blog");
const Category = require("../models/Category");
const cloudinary = require("../cloudinary");
const streamifier = require("streamifier");
const { get } = require("mongoose");
const Subscriber = require("../models/Subscriber");

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, description, summary, author, read_time, category, type } = req.body;
    if (!title || !description || !summary) {
      return res.status(400).json({ message: "Title, description, and summary are required" });
    }

    let imageUrl = null;
    if (req.file && req.file.buffer) {
      // Upload to Cloudinary from buffer (if using multer memory storage)
      const streamUpload = (req) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) resolve(result);
            else reject(error);
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      const result = await streamUpload(req);
      imageUrl = result.secure_url;
    } else if (req.file && req.file.path) {
      // If multer disk storage
      imageUrl = req.file.path;
    }

    const newBlog = new Blog({
      title,
      description,
      summary,
      author: author || "Admin",
      read_time: read_time || null,
      category: category || null,
      imageUrl,
      type: type || "English", 
    });
    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Fetch all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Like a blog
// const likeBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     res.json({ likes: blog.likes });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to like blog", error: error.message });
//   }
// };

// // Unlike a blog
// const unlikeBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findById(id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     if (blog.likes > 0) blog.likes -= 1;
//     await blog.save();
//     res.json({ likes: blog.likes });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to unlike blog", error: error.message });
//   }
// };

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, summary, author, read_time, category } = req.body;

    if (!title || !description || !summary) {
      return res.status(400).json({ message: "Title, description, and summary are required" });
    }

    let updateFields = {
      title,
      description,
      summary,
      author: author || "Admin",
      read_time: read_time || null,
      category: category || null,
      updatedAt: new Date(),
    };

    // Handle new image upload (if any)
    if (req.file && req.file.buffer) {
      const streamUpload = (req) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) resolve(result);
            else reject(error);
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      const result = await streamUpload(req);
      updateFields.imageUrl = result.secure_url;
    } else if (req.file && req.file.path) {
      updateFields.imageUrl = req.file.path;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const showAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const showSubscriberNumber = async (req, res) => {
  try {
    const count = await Subscriber.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getBanglaBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ type: "Bangla" }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getEnglishBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ type: "English" }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog, getBlogById, createCategory, deleteCategory,
  getCategoryById, getAllCategories, showAllSubscribers, showSubscriberNumber, getBanglaBlogs, getEnglishBlogs };
