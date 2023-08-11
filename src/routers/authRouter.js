const express = require("express");
const cookieParser = require("cookie-parser");
const { runValidation } = require("../validators/index.js");
const {
  handlelogging,
  handleLogOut,
} = require("../controllers/authController.js");
const { isLoggedIn ,isLoggOut} = require("../middlewares/auth");
const authRouter = express.Router();
authRouter.use(cookieParser()); // Use cookie-parser middleware

// Middleware to check if a user is logged in


authRouter.post("/login",isLoggOut,handlelogging);
authRouter.post("/logout",isLoggedIn, handleLogOut);

module.exports = authRouter;
