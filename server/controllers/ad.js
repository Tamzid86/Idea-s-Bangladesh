const Ad = require('../models/Ad');
const cloudinary = require('../cloudinary'); 
const streamifier = require("streamifier");

// Helper for Cloudinary upload from buffer (memory storage)
const uploadToCloudinary = async (file) => {
  if (!file || !file.buffer) return null;
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result.secure_url);
      else reject(error);
    });
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

const createAd = async (req, res) => {
  try {
    const { title, description, link, daysActive } = req.body;
    if (!title || !description || !link || !daysActive) {
      return res.status(400).json({ message: "Title, description, link, and daysActive are required" });
    }

    let sanitizedLink = link.trim();
    if (!/^https?:\/\//i.test(sanitizedLink)) {
      sanitizedLink = `https://${sanitizedLink}`;
    }

    let imageUrl = req.body.imageUrl || null;
    if (req.file && req.file.buffer) {
      imageUrl = await uploadToCloudinary(req.file);
    } else if (req.file && req.file.path) {
      imageUrl = req.file.path;
    }

    const expiresAt = new Date(Date.now() + parseInt(daysActive) * 24 * 60 * 60 * 1000);

    const ad = new Ad({ title, description, imageUrl, link: sanitizedLink, expiresAt });
    await ad.save();

    res.status(201).json(ad);
  } catch (err) {
    res.status(500).json({ message: "Failed to create ad", error: err.message });
  }
};


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
    const { title, description, link, daysActive } = req.body;

    if (!title || !description || !link) {
      return res.status(400).json({ message: "Title, description, and link are required" });
    }
    const updateFields = { title, description, link };

    if (daysActive) {
      updateFields.expiresAt = new Date(Date.now() + parseInt(daysActive) * 24 * 60 * 60 * 1000);
    }

    if (req.file && req.file.buffer) {
      updateFields.imageUrl = await uploadToCloudinary(req.file);
    } else if (req.file && req.file.path) {
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
