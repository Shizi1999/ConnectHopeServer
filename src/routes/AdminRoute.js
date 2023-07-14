const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.get("/person", AdminController.getPerson);
router.get("/organization", AdminController.getOrganization);
router.get("/user", AdminController.getUser);
router.get("/user-person", AdminController.getPersonByUserId);
router.get("/user-organization", AdminController.getOrganizationByUserId);
router.patch("/censored-person", AdminController.updatePersonCensored);
router.patch(
  "/censored-organization",
  AdminController.updateOrganizationCensored
);
router.patch("/block-user", AdminController.changeStatusUser);
router.delete("/delete-user", AdminController.deleteUser);
router.patch("/change-role", AdminController.changeRole);

module.exports = router;
