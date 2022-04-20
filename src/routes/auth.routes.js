const express = require("express");
const { AuthController } = require("../controllers");
const { checkAuthenciation } = require("../middlewares/authenciation");
const passport = require('passport');

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/change-password", checkAuthenciation, AuthController.changePassword);
router.get("/reset-password/:id", AuthController.sendResetPaswordToken);
router.post("/reset-password", AuthController.resetPasword);

// OAuth Google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login-fail" }), AuthController.authGoogle);

// OAuth Github
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login-fail" }),  AuthController.authGithub);

module.exports = router;
