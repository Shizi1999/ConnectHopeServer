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
  async getPost(req, res) {
    const { id } = req.query;
    let data = await Organization.findById(id);
    if (!data) {
      data = await Person.findById(id);
    }
    res.json({ success: true, data });
  }

  async search(req, res) {
    const { searchValue } = req.query;
    const regex = new RegExp(searchValue, "i");
    const person = await Person.find({ fullname: regex });
    const organization = await Organization.find({ name: regex });
    res.json({ success: true, data: [...person, ...organization] });
  }
}

module.exports = new HomeController();
