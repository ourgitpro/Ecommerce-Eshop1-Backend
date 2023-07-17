const User = require("../models/userModel");
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
module.exports = { seedUsers };
