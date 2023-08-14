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
const { createCategory } = require("../services/categoryService");

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

module.exports = {
  handleCreateCategory,
};

