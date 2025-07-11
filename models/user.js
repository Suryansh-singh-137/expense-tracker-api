const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password required"],
    trim: true,
  },
});
module.exports = mongoose.model("User", userSchema);
