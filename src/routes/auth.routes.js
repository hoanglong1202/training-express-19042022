const express = require("express");
const { AuthController } = require("../controllers");
const { checkAuthenciation } = require("../middlewares/authenciation");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post(
  "/change-password",
  checkAuthenciation,
  AuthController.changePassword
);

module.exports = router;
