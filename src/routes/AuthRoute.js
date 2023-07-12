const express = require("express");
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forget-password", AuthController.forgetPassword);
router.post("/change-password", authMiddleware, AuthController.changePassword);

module.exports = router;
