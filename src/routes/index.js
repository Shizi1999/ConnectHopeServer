const authRoute = require("../routes/AuthRoute");
const personRoute = require("../routes/PersonRoute");
const adminRoute = require("../routes/AdminRoute");
const organizationRoute = require("../routes/OrganizationRoute");

const userRoute = require("../routes/UserRoute");
const homeRoute = require("../routes/HomeRoute");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

function createRoute(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/person", personRoute);
  app.use("/api/user", authMiddleware, userRoute);
  app.use("/api/organization", authMiddleware, organizationRoute);
  app.use("/api/admin", authMiddleware, adminMiddleware, adminRoute);
  app.use("/api/public", homeRoute);
}
module.exports = createRoute;
