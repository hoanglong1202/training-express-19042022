const Authenciation = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(403).send({
      success: false,
      message: "Invalid jwt token send in request",
    });

    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).send({
        success: false,
        message: "Invalid jwt token send in request",
      });
    }
  }
};

module.exports = Authenciation;
