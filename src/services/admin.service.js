const User = require("../model/userSchema");

const getAllUser = async () => {
  const result = await User.find({}).select("-password -isDeleted");

  return result;
};

const updateUser = async (id, updateData) => {
  const result = await User.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });

  return result;
};

const deleteUser = async (id) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    {
      new: true,
    }
  ).select("-password");

  return result;
};

const activeUser = async (id) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { isActive: true },
    {
      new: true,
    }
  ).select("-password");

  return result;
};

const inactiveUser = async (id) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { isActive: false },
    {
      new: true,
    }
  ).select("-password");

  return result;
};

module.exports = {
  getAllUser,
  updateUser,
  deleteUser,
  activeUser,
  inactiveUser,
};
