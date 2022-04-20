const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthService } = require("../services");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await AuthService.getUserByUsername(username);

    if (user) {
      res.status(403).send({
        success: false,
        message: "Dupplicated Username",
      });
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND)
    );

    await AuthService.register({ ...req.body, password: hashPassword });

    res.status(200).send({
      success: true,
      message: "Create User successfullyy",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await AuthService.getUserByUsername(username);

    if (!user) {
      res.status(403).send({
        success: false,
        message: "Login failed",
      });
    }

    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) {
      res.status(403).send({
        success: false,
        message: "Login failed",
      });
    }

    const token = jwt.sign(
      { username: user.username, isActive: user.isActive, roles: user.roles },
      process.env.SECRET_JWT_KEY
    );

    res.status(200).send({
      success: true,
      message: "Login successfullyy",
      dataObj: token,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { username } = req.user;
    const { password } = req.body;

    const user = await AuthService.getUserByUsername(username);

    if (!user) {
      res.status(403).send({
        success: false,
        message: "Not authorization",
      });
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND)
    );

    const result = await AuthService.changePassword(username, hashPassword);

    res.status(200).send({
      success: true,
      message: "Change password successfullyy",
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  changePassword,
};
