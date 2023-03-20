const mongoose = require("mongoose");
const Tutorial = mongoose.model(
  "Tutorial",
  new mongoose.Schema({
    title: String,
    author: String,
  })
);
// Tutorial.
const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    tutorial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial",
    },
    name: String,
    description: String,
  })
);

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    tutorial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial",
    },
    userName: String,
    text: String,
    createdAt: Date,
  })
);

const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    tutorial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial",
    },
    path: String,
    url: String,
    caption: String,
    createdAt: Date,
  })
);

module.exports = { Category, Comment, Image, Tutorial };
