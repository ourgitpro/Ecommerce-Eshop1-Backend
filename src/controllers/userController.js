const createError = require("http-errors");
const User = require("../models/userModel");
const getUsers = (req, res, next) => {
  try {
    res.status(200).send({
      message: "user profile is return",
      
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getUsers };
