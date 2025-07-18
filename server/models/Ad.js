const mongoose = require("mongoose");
const { link } = require("../routes/postRoutes");

const adSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model("Ad", adSchema);