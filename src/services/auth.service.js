const Token = require("../model/tokenSchema");
const User = require("../model/userSchema");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

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

const addResetToken = async (id) => {
  const token = await Token.findOne({ userId: id });

  if (token) {
    await Token.deleteOne({ userId: id });
  }

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hashToken = await bcrypt.hash(resetToken, Number(process.env.SALT_ROUND));

  const newToken = new Token({
    userId: id,
    token: hashToken,
  });

  newToken.save();
  return resetToken;
};

const findTokenByUserId = async (id) => {
  const result = await Token.findOne({ userId: id });
  return result;
};

module.exports = {
  register,
  getUserByUsername,
  changePassword,
  getUserById,
  getUserByMail,
  addResetToken,
  findTokenByUserId,
};
