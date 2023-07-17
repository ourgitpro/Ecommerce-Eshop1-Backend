const mongoose = require("mongoose");
const { mongodbUrl } = require("../secret");
const ConnectDb = async () => {
  try {
    await mongoose.connect(mongodbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

module.exports = ConnectDb;
