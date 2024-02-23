const Post = require("../models/Post");
const User = require("../models/User");
const errorHandler = require("../exceptions/errorHandler");

class UserController {
  async getPost(req, res) {
    const user = req.user;
    try {
      const data = await Post.find({ author: user?._id });
      res.json({ success: true, data });
    } catch (error) {
      errorHandler(error, res);
    }
  }
  async updateInformation(req, res) {
    const { _id, fullname, address, phone, birthday, gender, avatar, author } =
      req.body;
    let user = req.user;
    const file = req.file;
    if (user.role === "user" && user._id !== _id) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission",
      });
    }
    try {
      const exsistUser = await User.findById(_id);
      if (!exsistUser) {
        res.status(404).json({
          success: false,
          message: "Không tìm thấy người dùng",
        });
      }
      exsistUser.fullname = fullname;
      exsistUser.address = address;
      exsistUser.phone = phone;
      exsistUser.birthday = birthday;
      exsistUser.gender = gender;
      exsistUser.avatar = !!file ? file?.path || "" : avatar;
      exsistUser.author = user.role === "user" ? author : user._id;
      await exsistUser.save();
      res.status(200).json({
        success: true,
        message: "Cập nhật thành công",
        data: {
          ...exsistUser.toObject(),
        },
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

module.exports = new UserController();