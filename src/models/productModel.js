// categoryModel.js
const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name Is Required"],
      trim: true,

      minlength: [3, "Product name Min Length"],
      maxlength: [150, "Product name Max Length"],
    },
    slug: {
      type: String,
      required: [true, "Product slug Is Required"],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product Description Is Required"],
      trim: true,
      minlength: [3, "Product Description Min Length 3"],
    },
    price: {
      type: Number,
      required: [true, "Product Price Is Required"],
      trim: true,
      validate: {
        validator: (v) => v > 0,

        message: (props) => `${props.value} is not a valid number`,
      },
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity Is Required"],
      trim: true,
      validate: {
        validator: (v) => v > 0,

        message: (props) => `${props.value} is not a valid quantity`,
      },
    },
    sold: {
      type: Number,
      required: [true, "Product sold Is Required"],
      trim: true,
      default: 0,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    image: {
      type: Buffer,
      contentType: String,
      required: [true, "Image Is Required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model("Products", productSchema);
module.exports = Product;
