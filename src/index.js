const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("DB connect successfuly");
  })
  .catch((err) => {
    console.log(err);
  });
