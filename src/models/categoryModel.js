// categoryModel.js
const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name Is Required"],
      trim: true,
      unique: true,
      minlength: [3, "Category name Min Length"],
    },
    slug: {
      type: String,
      required: [true, "Category slug Is Required"],
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Category = model("Categorys", categorySchema);
module.exports = Category;
