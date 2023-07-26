const express = require("express");
const HomeController = require("../controllers/HomeController");
const router = express.Router();

router.get("/person", HomeController.getPerson);
router.get("/organization", HomeController.getOrganization);
router.get("/post", HomeController.getPost);
router.get("/search", HomeController.search);

module.exports = router;
