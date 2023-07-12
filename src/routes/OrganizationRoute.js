const express = require("express");
const OrganizationController = require("../controllers/OrganizationController");
const cloudinaryUpload = require("../utils/cloudinaryUpload");

const router = express.Router();

// Define the routes for user registration and login
router.post(
  "/create",
  cloudinaryUpload.fields([
    { name: "thumbnailFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 8 },
  ]),
  OrganizationController.createOrganization
);
router.put(
  "/update",
  cloudinaryUpload.fields([
    { name: "thumbnailFile", maxCount: 1 },
    { name: "imageFiles", maxCount: 8 },
  ]),
  OrganizationController.updateOrganization
);
router.delete("/delete", OrganizationController.deleteOrganization);
module.exports = router;
