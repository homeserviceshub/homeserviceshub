const mongoose = require("mongoose");

const bookmarksSchema = mongoose.Schema({
  customerID: String,
  clientID: String,
  bookmarkDate: Date,
});

module.exports = mongoose.model("bookmarks", bookmarksSchema); //users is the collections name
