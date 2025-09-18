const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
  item: String,
  price: Number,
  review: reviewSchema
});

module.exports = mongoose.model("Order", orderSchema);
