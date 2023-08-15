const User = require("../models/userModel");
const Product= require("../models/productModel")
const data = require("../data");
const seedUsers = async (req, res, next) => {
  try {
    //deleting all existing users
    await User.deleteMany({});
    //inserting new users
    const users=await User.insertMany(data.users)
    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};
const seedProducts = async (req, res, next) => {
  try {
    //deleting all existing users
    await Product.deleteMany({});
    //inserting new users
    const products=await Product.insertMany(data.products)
    return res.status(201).json(products);
  } catch (error) {
    next(error);
  }
};
module.exports = { seedUsers, seedProducts};
