const User = require("../model/userSchema");

const getAllUser = async () => {
  const result = await User.find();

  return result;
};

module.exports = {
  getAllUser,
};
