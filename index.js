const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/db/ConnectDB");
const authRoute = require("./src/routes/AuthRoute");
const postRoute = require("./src/routes/PostRoute");
const adminRoute = require("./src/routes/AdminRoute");
const userRoute = require("./src/routes/UserRoute");
const homeRoute = require("./src/routes/HomeRoute");
const authMiddleware = require("./src/middlewares/authMiddleware");
const adminMiddleware = require("./src/middlewares/adminMiddleware");
const hbs = require("express-handlebars");
const dotenv = require("dotenv");
const envFile = `.env.${process.env.NODE_ENV || "development"}`;

dotenv.config({ path: envFile });

const app = express();
// View
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
  })
);
//Cors
app.use(cors());
// Json
app.use(express.json());
// DB
connectDB();
// Route
app.use("/api/auth", authRoute);
app.use("/api/post", authMiddleware, postRoute);
app.use("/api/user", authMiddleware, userRoute);
app.use("/api/admin", authMiddleware, adminMiddleware, adminRoute);
app.use("/api/public", homeRoute);
app.get("/", (req, res, next) => {
  res.json("Hello, We are Connect Hope");
});
app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port 8080");
});
