const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  roles: {
    type: String,
    enums: ["user", "admin"],
    default: ["user"],
  },
});

module.exports = mongoose.model("user", userSchema);
