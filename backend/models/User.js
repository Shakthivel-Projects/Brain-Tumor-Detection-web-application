const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first: String,
  last: String,
  email: { type: String, unique: true },
  pass: String,
  dob: String,
  phone: String
});

module.exports = mongoose.model("User", UserSchema);
