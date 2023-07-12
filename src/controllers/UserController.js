const Person = require("../models/Person");
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
}

module.exports = new UserController();
