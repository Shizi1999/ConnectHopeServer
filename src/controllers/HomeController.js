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
    const { _id } = req.query;
    try {
      // Find the post by its ID
      const post = await Post.findById(_id);
      if (!post) {
        res.json({ success: false, message: "Không tìm thấy bài viết" });
      }
      post.views += 1;
      await post.save();
      res.json({ success: true, data: null });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async getAuthor(req, res) {
    const { _id } = req.query;
    try {
      const user = await User.findById(_id);
      if (!user) {
        res.json({ success: false, message: "Không tìm thấy tác giả" });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async changeAuthor(req, res) {
    const { postId, authorId } = req.body
    if (!postId || !authorId) {
      res.status(500).json({ success: false, message: "Du lieu khong hop le" })
    }
    try {
      const user = await User.findById(authorId);
      if (!user) {
        res.status(500).json({ success: false, message: "Khong tim thay nguoi dung" })
      }
      const post = await Post.findById(postId);
      if (!post) {
        res.status(500).json({ success: false, message: "Khong tim thay bai viet" })
      } else {
        post.author = authorId
        await post.save()
        res.json({ success: true, message: "Success" })
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Interval" })
    }
  }
}

module.exports = new HomeController();
