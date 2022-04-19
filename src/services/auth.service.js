const User = require("../model/userSchema");

const register = async (data) => {
  const { username, password } = data;

  const newUser = new User({ username, password });
  await newUser.save();
};

const getUserByUsername = async (username) => {
  const result = await User.findOne({ username });

  return result;
};

module.exports = {
  register,
  getUserByUsername,
};
