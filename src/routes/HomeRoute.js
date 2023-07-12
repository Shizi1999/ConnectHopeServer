const express = require("express");
const HomeController = require("../controllers/HomeController");
const router = express.Router();

router.get("/person", HomeController.getPerson);
router.get("/organization", HomeController.getOrganization);
module.exports = router;
