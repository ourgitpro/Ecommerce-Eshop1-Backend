const createError = require("http-errors");
const slugify = require("slugify");
const Product = require("../models/productModel");
const { successResponse } = require("./responseController");
const {
  productCreate
} = require("../services/productService");
const handleProductCreater = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      shipping,
      category, // Extract the category field directly
    } = req.body;

    if (!req.file) {
      throw createError(400, "Image file is required");
    }

    const imageBufferString = req.file.buffer.toString("base64");

   /* const productExists = await Product.exists({ name: name });
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
    });*/
    const productData={ name,
      description,
      price,
      quantity,
      shipping,
      category,imageBufferString }
   const product= await productCreate(productData)
    return successResponse(res, {
      statusCode: 200,
      message: "Product created successfully",
      payload: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleProductCreater,
};
