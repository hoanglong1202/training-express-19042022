const express = require("express");
const { AdminController } = require("../controllers");
const { checkAuthenciation, checkAdminRole } = require("../middlewares/authenciation");

const router = express.Router();

router.get("/user", checkAuthenciation, checkAdminRole, AdminController.getAllUser);
router.put("/user", checkAuthenciation, checkAdminRole, AdminController.updateUserInfor);
router.delete("/user/:id", checkAuthenciation, checkAdminRole, AdminController.deleteUser);

router.get("/user/active/:id", checkAuthenciation, checkAdminRole, AdminController.activeUser);
router.get("/user/inactive/:id", checkAuthenciation, checkAdminRole, AdminController.inactiveUser);

module.exports = router;
