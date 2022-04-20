const jwt = require("jsonwebtoken");

const checkAuthenciation = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(403).send({
      success: false,
      message: "Invalid jwt token send in request",
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const checkAdminRole = async (req, res, next) => {
  try {
    const { roles } = req.user;
    if (!roles || roles !== "admin") {
      res.status(403).send({
        success: false,
        message: "Invalid authorization send in request",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  checkAuthenciation,
  checkAdminRole,
};
