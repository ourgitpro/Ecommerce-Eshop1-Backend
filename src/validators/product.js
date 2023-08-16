const { body } = require("express-validator");
const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product Name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name must be between 3 and 31 characters long"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name must be between 3  characters long"),
    body("price")
  .trim()
  .notEmpty()
  .withMessage("Category is required")
  .isFloat({ min: 0 })
  .withMessage("Price must be positive number"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category  is required"),
    
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be positive integer"),
  body("image")
    .custom((value, { req }) => {
      if (!req.file || !req.file.buffer) {
        throw new Error("User Image is required");
      }
      return true;
    })
    .withMessage("Image is required"),
];

module.exports = { validateProduct };
