const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
  reviewBy: String,
  reviewTo: String,
  reviewTitle: String,
  reviewDescription: String,
  stars: String,
  reviewDate: Date,
});

module.exports = mongoose.model("reviews", reviewsSchema); //users is the collections name
