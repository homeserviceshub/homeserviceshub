const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  number: String,
  joiningDate: Date,
  isAce: Boolean,
  profile_photo: Object,
  aceData: Object,
  postalCode: String,
});

module.exports = mongoose.model("users", usersSchema); //users is the collections name
