const express = require("express");
const {handleCreateCategory} = require("../controllers/categoryController");
const cookieParser = require("cookie-parser");
const { validateCategory} = require("../validators/category");
const { runValidation } = require("../validators/index.js");
const upload = require("../middlewares/uploadFile");
const { isLoggedIn, isLoggOut, isAdmin } = require("../middlewares/auth");
const categoryRouter = express.Router();
categoryRouter.use(cookieParser());
//api/categories common end point for every routes
categoryRouter.post("/",isLoggedIn,isAdmin,validateCategory,runValidation,handleCreateCategory);

module.exports = categoryRouter;
