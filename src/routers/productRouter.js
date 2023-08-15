const express = require("express");
const cookieParser = require("cookie-parser");
const { runValidation } = require("../validators/index.js");
const {
  handlelogging,
  handleLogOut,
  handleRefreshToken,
  handleProtected
} = require("../controllers/authController.js");
const { isLoggedIn, isLoggOut, isAdmin } = require("../middlewares/auth.js");
const productRouter = express.Router();
productRouter.use(cookieParser()); // Use cookie-parser middleware

// Middleware to check if a user is logged in


productRouter.post("/login",isLoggOut,handlelogging);


module.exports = productRouter;