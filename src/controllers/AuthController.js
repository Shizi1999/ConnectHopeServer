const _ = require("lodash");
const bcrypt = require("bcrypt");
const tokenUtils = require("../utils/tokenUtils");
const mailService = require("../service/mailService");
const User = require("../models/User");
const errorHandler = require("../exceptions/errorHandler");

class AuthController {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "Tên đăng nhập đã tồn tại" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.json({
        success: true,
        message: "Đăng ký thành công",
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({
          success: false,
          message: "Tên đăng nhập không tồn tại",
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.json({
          success: false,
          message: "Mật khẩu không chính xác",
        });
      }
      const token = tokenUtils.generateToken({ userId: user._id });
      res.json({
        success: true,
        message: "Success",
        data: {
          access_token: token,
          user: _.omit(user.toObject(), ["password"]),
        },
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async forgetPassword(req, res) {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (!existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "Email không tồn tại" });
      } else {
        const user = existingUser.toObject();
        const token = tokenUtils.generateToken(
          { userId: existingUser._id },
          { expiresIn: "5m" }
        );
        mailService.sendResetPasswordEmail({ email: user.email, token });
        return res.json({
          success: true,
          message:
            "Một email đã được gửi đến tài khoản của bạn. Vui lòng kiểm tra email",
        });
      }
    } catch (error) {
      errorHandler(error, res);
    }
  }

  async changePassword(req, res) {
    try {
      const user = req.user;
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { _id: user._id },
        { password: hashedPassword }
      );
      res.json({
        success: true,
        message: "Đổi mật khẩu thành công",
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

module.exports = new AuthController();
