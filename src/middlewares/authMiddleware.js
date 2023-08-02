const dotenv = require("dotenv");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require("../models/User");

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      let user = await User.findById(jwtPayload.userId);
      if (user) {
        let newId = user._id.toString()
        user = user.toObject()
        user._id = newId
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

function authMiddleware(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (user && user?.deleted) {
      return res.json({
        success: false,
        message: "Your account has been blocked",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = authMiddleware;
