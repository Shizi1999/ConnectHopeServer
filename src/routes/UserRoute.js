const express = require("express");
const UserController = require("../controllers/UserController");
const authMiddlware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/person", UserController.getPerson);
router.get("/organization", UserController.getOrganization);
router.put("/update", authMiddlware, UserController.updateInformation);

module.exports = router;
