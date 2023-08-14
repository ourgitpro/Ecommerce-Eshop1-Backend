/*const slugify = require("slugify");
const Category = require("../models/categoryModel");

const createCategory = async (name) => {
  const newCategory = await Category.create({
    name: name,
    slug: slugify(name),
  });
  return newCategory;
};
module.exports = {
  createCategory,
};*/
// categoryService.js
const Category = require("../models/categoryModel");
const slugify = require("slugify");

const createCategory = async (name) => {
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new Error("Category with this name already exists");
    }

    const newCategory = await Category.create({
      name,
      slug: slugify(name),
    });

    return newCategory;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCategory,
};
