const express = require("express");
const HomeController = require("../controllers/HomeController");
const router = express.Router();

router.get("/post", HomeController.getPost);
router.get("/posts", HomeController.getPosts);
router.get("/search", HomeController.search);

module.exports = router;
