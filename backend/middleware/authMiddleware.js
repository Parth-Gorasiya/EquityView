const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/UserModel");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.equityview_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please log in to continue.",
      });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
      {
        algorithms: ["HS256"],
      }
    );

    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "The account associated with this token no longer exists.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Your session has expired. Please log in again."
          : "Invalid authentication token.",
    });
  }
};

module.exports = { protect };