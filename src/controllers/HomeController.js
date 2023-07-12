const Person = require("../models/Person");
const Organization = require("../models/Organization");
const errorHandler = require("../exceptions/errorHandler");
class HomeController {
  async getPerson(_, res) {
    try {
      const data = await Person.find({ censored: true });
      res.json({ success: true, data });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async getOrganization(_, res) {
    try {
      const data = await Organization.find({ censored: true });
      res.json({ success: true, data });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

module.exports = new HomeController();
