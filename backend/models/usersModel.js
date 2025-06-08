const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String, sparse: true, unique: true },
  password: { type: String },
  number: { type: String, sparse: true, unique: true },
  joiningDate: { type: Date, default: Date.now },
  isAce: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  profile_photo: {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
    type: { type: String, default: "" },
  },
  aceData: { type: mongoose.Schema.Types.Mixed, default: {} },
  postalCode: { type: String, default: "" },
});

module.exports = mongoose.model("users", usersSchema);
