const nodemailer = require("nodemailer");
const nodemailerHbs = require("nodemailer-express-handlebars");
const path = require("path");
const handlebarsOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve(__dirname, "../views"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "../views"),
  extName: ".hbs",
};
const mailService = {
  async sendResetPasswordEmail({ email, token }) {
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });
      transporter.use("compile", nodemailerHbs(handlebarsOptions));
      // Configure the email options
      const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Cấp lại mật khẩu",
        template: "forget-password",
        context: {
          // Template variables
          resetLink: `${process.env.CLIENT_URL}/reset-password?token=${token}`, // Replace with your reset password link
        },
      };
      // Send the email with the template
      await transporter.sendMail(mailOptions);
      console.log("Sent email");
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = mailService;
