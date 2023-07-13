const Person = require("../models/Person");
const User = require("../models/User");
const Organization = require("../models/Organization");
const errorHandler = require("../exceptions/errorHandler");
class UserController {
  async getPerson(req, res) {
    const user = req.user;
    try {
      const data = await Person.find({ author: user?._id });
      res.json({ success: true, data });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async getOrganization(req, res) {
    try {
      const user = req.user;
      const data = await Organization.find({ author: user?._id });
      res.json({ success: true, data });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async updateInformation(req, res) {
    const updateData = req.body;
    const user = req.user;
    if (user.role === "user" && user._id !== updateData._id) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission",
      });
    }
    try {
      const allowedFields = Object.keys(updateData).filter(
        (field) => field !== "password" && field !== "deleted"
      );
      const update = { $set: {} };
      allowedFields.forEach((field) => {
        update.$set[field] = updateData[field];
      });
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body._id },
        update,
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Cập nhật thành công",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating user" });
    }
  }
}

module.exports = new UserController();
