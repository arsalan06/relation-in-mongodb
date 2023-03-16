const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
});
const Customer = mongoose.model("Customer", customerSchema);
const identifierSchema = new mongoose.Schema({
  customerCode: String,
  // this relation is by reference
  // customer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Customer",
  // },

  // relation with embedded document
  customer: customerSchema,
});
const Identifier = mongoose.model("Identifier", identifierSchema);
module.exports = { Customer, Identifier };
