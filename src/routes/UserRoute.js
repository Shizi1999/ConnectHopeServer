const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/person", UserController.getPerson);
router.get("/organization", UserController.getOrganization);
module.exports = router;
