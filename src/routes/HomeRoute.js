const express = require("express");
const HomeController = require("../controllers/HomeController");
const router = express.Router();

router.get("/post", HomeController.getPost);
router.get("/posts", HomeController.getPosts);
router.get("/search", HomeController.search);
router.get("/post-view", HomeController.updateView);
router.get("/author", HomeController.getAuthor);
router.post("/change-author", HomeController.changeAuthor)

module.exports = router;
