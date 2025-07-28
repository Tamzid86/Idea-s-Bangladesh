const { auth } = require("firebase-admin");
const mongoose = require("mongoose");

const ideaSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    author: { type: String, default: null },
    imageUrl: { type: String, default: null },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    likes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] }, // Array of subscriber emails who liked this idea
    submittedAt: { type: Date, default: Date.now }
  }
);

module.exports = mongoose.model("Idea", ideaSchema);
