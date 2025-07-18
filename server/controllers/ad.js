const Ad = require('../models/Ad');

const cloudinary = require('../cloudinary'); 
const streamifier = require("streamifier");

const createAd = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    if (!title || !description || !link) {
      return res.status(400).json({ message: "Title, description, and link are required" });
    }

    let imageUrl = null;

    if (req.file && req.file.path) {
      imageUrl = req.file.path; // Cloudinary image URL is here!
    }

    const newAd = new Ad({ title, description, link, imageUrl });
    await newAd.save();

    res.status(201).json(newAd);
  } catch (error) {
    console.error("Create ad error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// GET ALL ADS (optional)
const getAds = async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ads', error: error.message });
  }
};

const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    await Ad.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ad', error: error.message });
  }
};

const updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link } = req.body;

    if (!title || !description || !link) {
      return res.status(400).json({ message: "Title, description, and link are required" });
    }
    const updateFields = { title, description, link };
    if (req.file && req.file.path) {
      updateFields.imageUrl = req.file.path;
    }

    const updatedAd = await Ad.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedAd) return res.status(404).json({ message: "Ad not found" });

    res.status(200).json(updatedAd);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createAd, getAds, deleteAd, updateAd };
