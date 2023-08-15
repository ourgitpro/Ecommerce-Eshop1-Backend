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
const getCategories = async () => {
  return await Category.find({}).select("name slug").lean();
};
const getSlugCategory = async (slug) => {
  return await Category.find({ slug }).select("name slug").lean();
};
const updateCategory = async (slug, name) => {
  const updateCategory = await Category.findOneAndUpdate(
    { slug },
    { $set: { name: name, slug: slugify(name) } },
    { new: true }
  );
  return updateCategory;
};
const deleteCategory = async (slug) => {
  const result= await Category.findOneAndDelete({ slug })
  return result
};
module.exports = {
  createCategory,
  getCategories,
  getSlugCategory,
  updateCategory,
  deleteCategory,
};
