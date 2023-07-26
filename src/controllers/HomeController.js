const Post = require("../models/Post");
const errorHandler = require("../exceptions/errorHandler");
class HomeController {
  async getPosts(_, res) {
    try {
      const data = await Post.find({ censored: true });
      res.json({ success: true, data });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async getPost(req, res) {
    const { id } = req.query;
    const data = await Post.findById(id);
    res.json({ success: true, data });
  }

  async search(req, res) {
    const { searchValue } = req.query;
    const regex = new RegExp(searchValue, "i");
    const data = await Post.find({ title: regex });
    res.json({ success: true, data });
  }
}

module.exports = new HomeController();
