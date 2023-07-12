const jwt = require("jsonwebtoken");

const tokenUtils = {
  generateToken(data, options = { expiresIn: "24h" }) {
    return jwt.sign(data, process.env.SECRET_KEY, {
      ...options,
    });
  },
};

module.exports = tokenUtils;
