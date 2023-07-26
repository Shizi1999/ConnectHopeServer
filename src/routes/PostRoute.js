const express = require("express");
const PostController = require("../controllers/PostController");
const cloudinaryUpload = require("../utils/cloudinaryUpload");

const router = express.Router();
router.post(
  "/create",
  cloudinaryUpload.single("thumbnailFile"),
  PostController.createPost
);
router.put(
  "/update",
  cloudinaryUpload.single("thumbnailFile"),
  PostController.updatePost
);
router.delete("/delete", PostController.deletePost);
router.get("/:id", PostController.getById);

module.exports = router;
