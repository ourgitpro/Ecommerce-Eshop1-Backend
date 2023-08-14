const { body } = require("express-validator");

const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("CategoryName is required")
    .isLength({ min: 3 })
    .withMessage("CategoryName must be 3 characters long"),
];

module.exports = { validateCategory };
