const createError = require("http-errors");
const slugify = require("slugify");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const { successResponse } = require("./responseController");
const {
  productCreate,
  allProductGets,
  deleteProduct,
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
    const productData = {
      name,
      description,
      price,
      quantity,
      shipping,
      category,
      imageBufferString,
    };
    const product = await productCreate(productData);
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
const handleGetProducts = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 4;
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      $or: [{ name: { $regex: searchRegExp } }],
    };
    const products = await Product.find(filter)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const count = await Product.find(filter).countDocuments();
    return successResponse(res, {
      statusCode: 200,
      message: "Products Get All successfully",
      payload: {
        products: products,
        paginations: {
          totalPages: Math.ceil(count / limit),
          currentPages: page,
          priviousPages: page - 1,
          nextPages: page + 1,
          totalNumberOfProducts: count,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
const handleGetSingleProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate("category");

    return successResponse(res, {
      statusCode: 200,
      message: "Product retrieved successfully",
      payload: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};
const handleDeleteProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await deleteProduct(slug);

    return successResponse(res, {
      statusCode: 200,
      message: "Product retrieved successfully",
      payload: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};
const handleUpdateProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const updateOptions = { new: true, runValidators: true, context: "query" };
    let updates = {};
    if (req.body.name) {
      updates.name = req.body.name;
    }
    if (req.body.description) {
      updates.description = req.body.description;
    }
    if (req.body.price) {
      updates.price = req.body.price;
    }
    if (req.body.sold) {
      updates.sold = req.body.sold;
    }
    if (req.body.quantity) {
      updates.quantity = req.body.quantity;
    }
    if (req.body.shipping) {
      updates.shipping = req.body.shipping;
    }

    const image = req.file;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(404, "File too large. It must be 2 MB or smaller.");
      }
      updates.image = image.buffer.toString("base64");
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      updates,
      updateOptions
    );
    if (!updatedProduct) {
      throw createError(404, "Product not found");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User update successfully by Nahid",
      payload: { updatedProduct },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleProductCreater,
  handleGetProducts,
  handleGetSingleProduct,
  handleDeleteProduct,
  handleUpdateProduct,
};
