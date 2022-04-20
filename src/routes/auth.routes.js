const express = require("express");
const res = require("express/lib/response");
const { AuthController } = require("../controllers");
const { checkAuthenciation } = require("../middlewares/authenciation");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/change-password", checkAuthenciation, AuthController.changePassword);
router.get("/reset-password/:id", AuthController.sendResetPaswordToken);
router.post("/reset-password", AuthController.resetPasword);

module.exports = router;
