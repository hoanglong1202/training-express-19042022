const express = require("express");
const { AdminController } = require("../controllers");

const router = express.Router();

router.get("/user", AdminController.getAllUser);

module.exports = router;
