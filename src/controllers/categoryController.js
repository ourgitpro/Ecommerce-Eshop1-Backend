/*const slugify = require("slugify");
const Category = require("../models/categoryModel");
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const { createCategory } = require("../services/categoryService");
const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(slugify(name));
    const newCategory = await createCategory(name)
    return successResponse(res, {
      statusCode: 200,
      message: "Category Was Created successfully",
      payload: newCategory,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  handleCreateCategory,
};*/
// categoryController.js
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const { createCategory, getCategories,getSlugCategory,updateCategory,deleteCategory} = require("../services/categoryService");

const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategory(name);
    return successResponse(res, {
      statusCode: 200,
      message: "Category Was Created successfully",
      payload: newCategory,
    });
  } catch (error) {
    next(error);
  }
};
const handleGetCategories = async (req, res, next) => {
  try {
    
    const categories = await getCategories();
    return successResponse(res, {
      statusCode: 200,
      message: "All category show  successfully",
      payload: categories,
    });
  } catch (error) {
    next(error);
  }
};
const handleSlugCategory = async (req, res, next) => {
  try {
    const {slug}= req.params
    const category = await getSlugCategory(slug);
    return successResponse(res, {
      statusCode: 200,
      message: "All category show  successfully",
      payload: category,
    });
  } catch (error) {
    next(error);
  }
};
const handleUpdateCategory = async (req, res, next) => {
  try {
    const {name}= req.body
    const {slug}= req.params
    const category = await updateCategory(slug,name);
    return successResponse(res, {
      statusCode: 200,
      message: "All category show  successfully",
      payload: category,
    });
  } catch (error) {
    next(error);
  }
};
const handleDeleteCategory = async (req, res, next) => {
  try {
  
    const {slug}= req.params
    const category = await deleteCategory(slug);
    return successResponse(res, {
      statusCode: 200,
      message: "All category show  successfully",
      payload: category,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  handleCreateCategory,
  handleGetCategories,
  handleSlugCategory,
  handleUpdateCategory,
  handleDeleteCategory
};

