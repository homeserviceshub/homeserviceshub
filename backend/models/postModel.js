const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  joiningDate: Date,
});

module.exports = mongoose.model("users", usersSchema); //users is the collections name
