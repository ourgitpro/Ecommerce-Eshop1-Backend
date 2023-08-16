const express = require("express");
const cookieParser = require("cookie-parser");
const { validateProduct } = require("../validators/product");
const { runValidation } = require("../validators/index.js");
const { handleProductCreater } = require("../controllers/productController.js");
const upload = require("../middlewares/uploadFile");
const { isLoggedIn, isLoggOut, isAdmin } = require("../middlewares/auth.js");
const productRouter = express.Router();
productRouter.use(cookieParser()); // Use cookie-parser middleware

// Middleware to check if a user is logged in

productRouter.post(
  "/",
  upload.single("image"),
  isLoggedIn,
  isAdmin,
  validateProduct,
  runValidation,
  handleProductCreater
);

module.exports = productRouter;
