const express = require("express");
const cookieParser = require("cookie-parser");
const { runValidation } = require("../validators/index.js");
const {
  handlelogging,
  handleLogOut,
  handleRefreshToken,
  handleProtected
} = require("../controllers/authController.js");
const { isLoggedIn, isLoggOut, isAdmin } = require("../middlewares/auth");
const authRouter = express.Router();
authRouter.use(cookieParser()); // Use cookie-parser middleware

// Middleware to check if a user is logged in


authRouter.post("/login",isLoggOut,handlelogging);
authRouter.post("/logout",isLoggedIn, handleLogOut);
authRouter.get("/refresh-token",  handleRefreshToken);
authRouter.get("/protected",  handleProtected);

module.exports = authRouter;
