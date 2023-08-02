const Post = require("../models/Post");
const User = require("../models/User");
const errorHandler = require("../exceptions/errorHandler");
class AdminController {
  async getPost(_, res) {
    try {
      const data = await Post.find();
      res.json({ success: true, data });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async getUser(_, res) {
    try {
      const data = await User.find();
      res.json({ success: true, data });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async updatePostCensored(req, res) {
    try {
      const { _id, censored } = req.body;
      const post = await Post.findOneAndUpdate({ _id }, { censored });
      res.json({
        success: !!post,
        message: !!post ? "Thành công" : "Không tìm thấy cá nhân này",
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async changeStatusUser(req, res) {
    try {
      const { _id, deleted } = req.body;
      const user = await User.findOneAndUpdate({ _id }, { deleted });
      if (user) {
        await Person.updateMany({ author: _id }, { censored: false });
        await Organization.updateMany({ author: _id }, { censored: false });
      }
      res.json({
        success: !!user,
        message: !!!user ? "Không tìm thấy tài khoản" : "Thao tác thành công",
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async deleteUser(req, res) {
    try {
      const { _id } = req.body;
      await Person.deleteMany({ author: _id });
      await Organization.deleteMany({ author: _id });
      await User.deleteOne({ _id });
      res.json({ success: true, message: "Thành công" });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async getPostByUserId(req, res) {
    try {
      const data = await Post.find({ author: req.query.id });
      res.json({ success: true, data });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async changeRole(req, res) {
    try {
      const data = await User.findOneAndUpdate(
        { _id: req.body._id },
        { role: req.body.role }
      );
      res.json({ success: true, message: "Thành công", data });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

module.exports = new AdminController();
