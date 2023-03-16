const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const { Customer, Identifier } = require("./models/userModel");
app.use(bodyParser.json());
app.post("/create-customer", async (req, res) => {
  try {
    console.log(req.body);
    const newCustomer = await Customer.create(req.body);
    const newIdentifier = await Identifier.create({
      customerCode: newCustomer._id.toString(),
      customer: newCustomer,
    });
    res.status(200).json({
      status: "success",
      data: {
        cutomer: newCustomer,
        Identifier: newIdentifier,
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
