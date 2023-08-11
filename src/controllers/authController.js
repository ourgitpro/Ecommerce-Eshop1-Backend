const createError = require("http-errors");
const { jwtAccessKey } = require("../secret");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const handlelogging = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "User not found");
    }
    //compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(404, "User password not match found");
    }
    if (user.isBanned) {
      throw createError(403, "User is banned");
    }
    //create jwt token
    const accessToken = createJSONWebToken(
      { email, isAdmin: user.isAdmin },
      jwtAccessKey,
      "15m"
    );
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return successResponse(res, {
      statusCode: 200,
      message: "user profile is return successfully by Nahid",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};
const handleLogOut = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    return successResponse(res, {
      statusCode: 200,
      message: "user profile is loggedout successfully by Nahid",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { handlelogging, handleLogOut };
