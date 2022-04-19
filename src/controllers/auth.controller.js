const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthService } = require("../services");

const register = async (req, res, next) => {
  const { password } = req.body;

  const hashPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUND)
  );

  await AuthService.register({ ...req.body, password: hashPassword });

  res.status(200).send({
    success: true,
    message: "Create User successfullyy",
  });
};

const login = async (req, res, next) => {
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
    { username: user.username, isActive: user.isActive },
    process.env.SECRET_JWT_KEY
  );

  res.status(200).send({
    success: true,
    message: "Login successfullyy",
    dataObj: token,
  });
};

module.exports = {
  register,
  login,
};
