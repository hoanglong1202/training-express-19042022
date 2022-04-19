const express = require("express");
const router = express.Router();
const adminRoute = require("./admin.routes");
const authRoute = require("./auth.routes");

const defaultRoutes = [
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
