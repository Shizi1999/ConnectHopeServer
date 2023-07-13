const express = require("express");
const PersonController = require("../controllers/PersonController");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinaryUpload = require("../utils/cloudinaryUpload");

const router = express.Router();

// Define the routes for user registration and login
router.post(
  "/create",
  authMiddleware,
  cloudinaryUpload.fields([
    { name: "avatarFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 8 },
  ]),
  PersonController.createPerson
);
router.put(
  "/update",
  authMiddleware,
  cloudinaryUpload.fields([
    { name: "avatarFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 8 },
  ]),
  PersonController.updatePerson
);
router.delete("/delete", authMiddleware, PersonController.deleteById);
router.get("/:id", PersonController.getById);
module.exports = router;
