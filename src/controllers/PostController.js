const Post = require("../models/Post");
const errorHandler = require("../exceptions/errorHandler");

class PostController {
  async createPost(req, res) {
    const file = req.file;
    try {
      const user = req.user;
      const newPost = new Post({
        ...req.body,
        author: user._id,
        thumbnail: file ? file?.path : "",
      });
      await newPost.save();
      res.status(201).json({
        success: true,
        message: "Thêm mới thành công",
        data: newPost,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async updatePost(req, res) {
    try {
      const user = req.user;
      const file = req.file;
      const {
        title,
        description,
        thumbnail,
        censored,
        author,
        shortDescription,
        _id,
      } = req.body;
      const post = await Post.findById(_id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
          data: undefined,
        });
      }
      if (user.role === "user" && user._id !== post.author) {
        return res.status(403).json({
          success: false,
          message: "You have not permission",
          data: undefined,
        });
      }
      post.title = title;
      post.description = description;
      post.shortDescription = shortDescription;
      post.author = user.role === "user" ? author : user._id;
      post.thumbnail = !!file ? file?.path || "" : thumbnail;
      post.censored = user.role === "admin" ? censored : false;
      await post.save();
      res.json({
        success: true,
        message: "Cập nhật thành công",
        data: post,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async deletePost(req, res) {
    try {
      const user = req.user;
      const { _id } = req.body;
      const post = await Post.findById(_id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy tổ chức",
          data: undefined,
        });
      }
      if (user.role === "user" && post.author.toString() !== user._id) {
        return res.status(403).json({
          success: false,
          message: "Bạn không có quyền xóa tổ chức này",
          data: undefined,
        });
      }
      await post.deleteOne({ _id });
      res.json({
        success: true,
        message: "Xóa thành công",
        data: undefined,
      });
    } catch (error) {
      errorHandler(err, res);
    }
  }
  async getById(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      res.json({
        success: !!post,
        message: !!post ? "Thành công" : "Không tìm thấy thông tin",
        data: post,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

module.exports = new PostController();
