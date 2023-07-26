const authRoute = require("../routes/AuthRoute");
const postRoute = require("../routes/PostRoute");
const adminRoute = require("../routes/AdminRoute");

const userRoute = require("../routes/UserRoute");
const homeRoute = require("../routes/HomeRoute");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

function createRoute(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/post", authMiddleware, postRoute);
  app.use("/api/user", authMiddleware, userRoute);
  app.use("/api/admin", authMiddleware, adminMiddleware, adminRoute);
  app.use("/api/public", homeRoute);
}
module.exports = createRoute;
