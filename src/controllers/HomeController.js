const Post = require("../models/Post");
const User = require("../models/User");
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

  async updateView(req, res) {
    const { _id } = req.params;
    try {
      // Find the post by its ID
      const post = await Post.findById(_id);
      if (!post) {
        res.json({ success: false, message: "Không tìm thấy bài viết" });
      }
      post.views += 1;
      await post.save();
      res.json({ success: true, data });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async getAuthor(req, res) {
    const { _id } = req.params;
    try {
      const user = await User.findById(_id);
      if (!user) {
        res.json({ success: false, message: "Không tìm thấy tác giả" });
      }
      res.json({ success: true, user });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

module.exports = new HomeController();
