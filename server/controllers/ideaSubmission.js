const Idea = require('../models/UserIdea');

// User submits an idea
const submitIdea = async (req, res) => {
  try {
    const { title, description, author } = req.body;
    let imageUrl = null;
    if (req.file && req.file.path) imageUrl = req.file.path;

    const newIdea = new Idea({
      title,
      description,
      imageUrl,
      author,
      status: "pending"
    });

    await newIdea.save();
    res.status(201).json({ message: "Idea submitted for review!", idea: newIdea });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit idea", error: error.message });
  }
};

// Admin: View all pending ideas
const getPendingIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ status: "pending" }).sort({ submittedAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Failed to get ideas", error: error.message });
  }
};

// Admin: Approve idea
const approveIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Idea.findByIdAndUpdate(id, { status: "approved" }, { new: true });
    res.json({ message: "Idea approved!", idea: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve idea", error: error.message });
  }
};

// Admin: Reject (delete) idea
const rejectIdea = async (req, res) => {
  try {
    const { id } = req.params;
    await Idea.findByIdAndDelete(id);
    res.json({ message: "Idea rejected and deleted." });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject idea", error: error.message });
  }
};

// Public: Get all approved ideas
const getApprovedIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ status: "approved" }).sort({ submittedAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Failed to get ideas", error: error.message });
  }
};

const getApprovedIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findById(id);
    if (!idea || idea.status !== "approved") {
      return res.status(404).json({ message: "Approved idea not found" });
    }
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: "Failed to get approved idea", error: error.message });
  }
};

// Like a blog post
const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ likes: blog.likes });
  } catch (error) {
    res.status(500).json({ message: "Failed to like blog", error: error.message });
  }
};

// Unlike (dislike) a blog post
const unlikeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.likes > 0) blog.likes -= 1;
    await blog.save();
    res.json({ likes: blog.likes });
  } catch (error) {
    res.status(500).json({ message: "Failed to unlike blog", error: error.message });
  }
};

const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;
    await Idea.findByIdAndDelete(id);
    res.json({ message: "Idea deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete idea", error: error.message });
  }
};

// Like/Unlike idea
const likeIdea = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const idea = await Idea.findById(id);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const hasLiked = idea.likedBy.includes(email);

    if (hasLiked) {
      // Unlike: remove email from likedBy array and decrement likes
      idea.likedBy = idea.likedBy.filter(userEmail => userEmail !== email);
      idea.likes = Math.max(0, idea.likes - 1);
    } else {
      // Like: add email to likedBy array and increment likes
      idea.likedBy.push(email);
      idea.likes += 1;
    }

    await idea.save();

    res.json({
      likes: idea.likes,
      liked: !hasLiked,
      message: hasLiked ? "Idea unliked" : "Idea liked"
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to like/unlike idea", error: error.message });
  }
};

module.exports = { submitIdea, getPendingIdeas, approveIdea, rejectIdea, getApprovedIdeas, getApprovedIdea, likeBlog, unlikeBlog, deleteIdea, likeIdea };
