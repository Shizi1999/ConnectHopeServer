function adminMiddleWare(req, res, next) {
  const user = req.user;
  if (user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access Denied - You don't have permission to access",
    });
  }
}

module.exports = adminMiddleWare;
