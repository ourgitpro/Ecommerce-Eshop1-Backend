const express = require("express");
const { seedUsers, seedProducts } = require("../controllers/seedController");
const seedRouter = express.Router();
const upload = require("../middlewares/uploadFile");
seedRouter.get("/users", seedUsers);
seedRouter.get(
  "/products",

  upload.single("image"),

  seedProducts
);
module.exports = seedRouter;
