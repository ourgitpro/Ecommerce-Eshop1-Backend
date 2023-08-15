const express = require("express");
const {handleCreateCategory,handleGetCategories, handleSlugCategory,handleUpdateCategory,handleDeleteCategory} = require("../controllers/categoryController");
const cookieParser = require("cookie-parser");
const { validateCategory} = require("../validators/category");
const { runValidation } = require("../validators/index.js");
const upload = require("../middlewares/uploadFile");
const { isLoggedIn, isLoggOut, isAdmin } = require("../middlewares/auth");
const categoryRouter = express.Router();
categoryRouter.use(cookieParser());
//api/categories common end point for every routes
categoryRouter.post("/",isLoggedIn,isAdmin,validateCategory,runValidation,handleCreateCategory);
categoryRouter.get("/",handleGetCategories);
categoryRouter.get("/:slug", handleSlugCategory);
categoryRouter.put("/:slug",isLoggedIn,isAdmin,validateCategory,runValidation, handleUpdateCategory);
categoryRouter.delete("/:slug",isLoggedIn,isAdmin, handleDeleteCategory);
module.exports = categoryRouter;
