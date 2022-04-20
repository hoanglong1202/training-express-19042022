const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { resetPasswordMail } = require("../helpers/mailTemplate");
const { AuthService } = require("../services");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await AuthService.getUserByUsername(username);

    if (user) {
      res.status(403).send({
        success: false,
        message: "Dupplicated Username",
      });

      next();
    }

    const userMail = await AuthService.getUserByMail(email);
    if (userMail) {
      res.status(403).send({
        success: false,
        message: "Dupplicated User Mail",
      });

      next();
    }

    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));

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

      next();
    }

    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) {
      res.status(403).send({
        success: false,
        message: "Login failed",
      });

      next();
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

const changePassword = async (req, res, next) => {
  try {
    const { username } = req.user;
    const { password } = req.body;

    const user = await AuthService.getUserByUsername(username);

    if (!user) {
      res.status(403).send({
        success: false,
        message: "Not authorization",
      });

      next();
    }

    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));

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

const sendResetPaswordToken = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await AuthService.getUserById(id);

    if (!user) {
      res.status(403).send({
        success: false,
        message: "Not authorization",
      });

      next();
    }

    const token = await AuthService.addResetToken(user._id);
    console.log("reset token: " + token);
    const template = resetPasswordMail(token, user._id);
    await mailer(user.email, template);

    res.status(200).send({
      success: true,
      message: "Reset password send successfullyy",
    });
  } catch (error) {
    next(error);
  }
};

const resetPasword = async (req, res, next) => {
  try {
    const { userId, newPassword, token } = req.body;
    const user = await AuthService.getUserById(userId);

    if (!user) {
      res.status(403).send({
        success: false,
        message: "Not authorization",
      });

      next();
    }

    let passwordResetToken = await AuthService.findTokenByUserId(userId);
    if (!passwordResetToken) {
      res.status(403).send({
        success: false,
        message: "Invalid or expired password reset token",
      });

      next();
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    console.log(isValid);
    if (!isValid) {
      res.status(403).send({
        success: false,
        message: "Invalid or expired password reset token",
      });

      next();
    }

    const hashPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUND));
    const result = await AuthService.changePassword(user.username, hashPassword);

    res.status(200).send({
      success: true,
      message: "Reset password successfullyy",
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const authGoogle = async (req, res, next) => {
  try {
    const { id, displayName } = req.user;

    const user = {
      username: displayName,
      googleId: id,
    };

    await AuthService.addGoogleId(user);

    res.redirect("/login-success");
  } catch (error) {
    next(error);
  }
};

const authGithub = async (req, res, next) => {
  try {
    const { id, displayName } = req.user;

    const user = {
      username: displayName,
      googleId: id,
    };

    await AuthService.addGithubId(user);

    res.redirect("/login-success");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  changePassword,
  sendResetPaswordToken,
  resetPasword,
  authGoogle,
  authGithub,
};
