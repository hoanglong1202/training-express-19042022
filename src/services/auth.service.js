const User = require("../model/userSchema");

const register = async (data) => {
  const { username, email, password } = data;

  const newUser = new User({ username, email, password });
  await newUser.save();
};

const getUserByUsername = async (username) => {
  const result = await User.findOne({ username });

  return result;
};

const getUserByMail = async (email) => {
  const result = await User.findOne({ email });

  return result;
};

const getUserById = async (id) => {
  const result = await User.findOne({ _id: id });

  return result;
};

const changePassword = async (username, newPassword) => {
  let result = await User.findOneAndUpdate(
    { username },
    { password: newPassword },
    {
      new: true,
    }
  );

  return result;
};

module.exports = {
  register,
  getUserByUsername,
  changePassword,
  getUserById,
  getUserByMail,
};
