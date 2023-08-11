const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtAccessKey } = require("../secret");
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw createError(401, "Access token not found,Please login first");
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, jwtAccessKey);
    req.user = decodedToken

    next(); // Move to the next middleware
  } catch (error) {
    next(error);
  }
};
const isLoggOut = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (token) {
      throw createError(401, "User is already logged in");
    }

    next(); // Move to the next middleware
  } catch (error) {
    next(error);
  }
};
const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user.isAdmin);
    if (!req.user.isAdmin) {
      throw createError(403, "Forbidden, You must be an admin");
    }

    next(); // Move to the next middleware
  } catch (error) {
    next(error);
  }
};
module.exports = { isLoggedIn, isLoggOut, isAdmin };
