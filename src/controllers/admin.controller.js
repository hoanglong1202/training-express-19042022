const { AdminService, AuthService } = require("../services");

const getAllUser = async (req, res, next) => {
  try {
    const result = await AdminService.getAllUser({ isDeleted: false });

    res.status(200).send({
      success: true,
      message: "Fetching data successfullyy",
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserInfor = async (req, res, next) => {
  try {
    const { username } = req.username;
    const user = await AuthService.getUserByUsername(username);

    if (!user) {
      res.status(403).send({
        success: false,
        message: "user is not exist",
      });
    }

    const updateData = { username };
    const result = await AdminService.updateUser(user._id, updateData);

    res.status(200).send({
      success: true,
      message: "Update user successfullyy",
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await AuthService.getUserById(id);

    if (!id || !user) {
      if (!user) {
        res.status(403).send({
          success: false,
          message: "Request is not valid",
        });
      }
    }

    const result = await AdminService.deleteUser(id);
    res.status(200).send({
      success: true,
      message: "Delete user successfullyy",
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const activeUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await AuthService.getUserById(id);

    if (!id || !user) {
      if (!user) {
        res.status(403).send({
          success: false,
          message: "Request is not valid",
        });
      }
    }

    const result = await AdminService.activeUser(id);
    res.status(200).send({
      success: true,
      message: "Active user successfullyy",
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const inactiveUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await AuthService.getUserById(id);

    if (!id || !user) {
      if (!user) {
        res.status(403).send({
          success: false,
          message: "Request is not valid",
        });
      }
    }

    const result = await AdminService.inactiveUser(id);
    res.status(200).send({
      success: true,
      message: "Inactive user successfullyy",
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  updateUserInfor,
  deleteUser,
  activeUser,
  inactiveUser,
};
