const express = require("express");
const UserController = require("../controllers/UserController");
const authMiddlware = require("../middlewares/authMiddleware");
const cloudinaryUpload = require("../utils/cloudinaryUpload");
const router = express.Router();

router.get("/person", UserController.getPerson);
router.get("/organization", UserController.getOrganization);
router.put(
  "/update",
  authMiddlware,
  cloudinaryUpload.single("image"),
  UserController.updateInformation
);

module.exports = router;
