const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.get("/post", AdminController.getPost);
router.get("/user", AdminController.getUser);
router.get("/user-post", AdminController.getPostByUserId);
router.patch("/censored-post", AdminController.updatePostCensored);
router.patch("/block-user", AdminController.changeStatusUser);
router.delete("/delete-user", AdminController.deleteUser);
router.patch("/change-role", AdminController.changeRole);

module.exports = router;
