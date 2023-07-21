const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/db/ConnectDB");
const createRoute = require("./src/routes");
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
createRoute(app);
app.get("/", (req, res, next) => {
  res.json("Hello, We are Connect Hope");
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
