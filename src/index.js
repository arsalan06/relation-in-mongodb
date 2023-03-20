const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const { Category, Comment, Image, Tutorial } = require("./models/models");
app.use(bodyParser.json());
app.post("/create-tutorial", async (req, res) => {
  try {
    const { title, author, username, text, name, description, url, caption } =
      req.body;
    console.log(req.body);
    const newTutorial = await Tutorial.create({
      title,
      author,
    });
    const newImage = await Image.create({
      // path: "sites/uploads/images/mongodb.png",
      tutorial: newTutorial._id,
      url,
      caption,
      createdAt: Date.now(),
    });
    const newCategory = await Category.create({
      tutorial: newTutorial._id,
      name,
      description,
    });
    const newComment = await Comment.create({
      tutorial: newTutorial._id,
      username,
      text,
      createdAt: Date.now(),
    });
    res.status(200).json({
      status: "success",
      data: {
        Tutorial: newTutorial,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/get-tutorial", async (req, res) => {
  try {
    console.log(req.query.id);
    // const allTutorial = await Category.findOne();
    const allTutorial = await Tutorial.findById(req.query.id).select(
      {
        path: "comments",
        // strictPopulate: false
      }
    );
    // .populate("Category", "name -_id")
    // .select("-Image._id -__v");
    res.status(200).json({
      status: "success",
      data: {
        allTutorial,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("DB connect successfuly");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
