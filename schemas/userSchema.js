const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  googleId: String,
  cart: Array,
  isAdmin: Boolean,
  secret: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
