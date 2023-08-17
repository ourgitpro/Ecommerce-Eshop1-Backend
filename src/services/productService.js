// categoryService.js
const createError = require("http-errors");
const Product = require("../models/productModel");
const slugify = require("slugify");

const productCreate = async (productData) => {
  const {
    name,
    description,
    price,
    quantity,
    shipping,
    category,
    imageBufferString, // Extract the category field directly
  } = productData;
  try {
    const productExists = await Product.exists({ name: name });
    if (productExists) {
      throw createError(409, "This product already exists");
    }

    // Create product
    const product = await Product.create({
      name: name,
      slug: slugify(name),
      description: description,
      price: price,
      quantity: quantity,
      shipping: shipping,
      image: imageBufferString,
      category: category, // Use the extracted category field
    });

    return product;
  } catch (error) {
    throw error;
  }
};
const allProductGets = async (productData) => {
  const {
    name,
    description,
    price,
    quantity,
    shipping,
    category,
    imageBufferString, // Extract the category field directly
  } = productData;
  try {
    const productExists = await Product.exists({ name: name });
    if (productExists) {
      throw createError(409, "This product already exists");
    }

    // Create product
    const product = await Product.create({
      name: name,
      slug: slugify(name),
      description: description,
      price: price,
      quantity: quantity,
      shipping: shipping,
      image: imageBufferString,
      category: category, // Use the extracted category field
    });

    return product;
  } catch (error) {
    throw error;
  }
};
const deleteProduct = async (slug) => {
  
  try {
    

    // Create product
    const product = await Product.findOneAndDelete({
      slug // Use the extracted category field
    });

    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  productCreate,
  allProductGets,
  deleteProduct
};
