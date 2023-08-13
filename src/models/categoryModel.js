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
    /* image: {
      type: Buffer,
      contentType: String,
      required: true,
      validate: [
        function () {
          // The `this` context refers to the current document being saved.
          // If the document is being updated (i.e., not a new document creation) and the image is being set to `null`, bypass the validation.
          return !(this.isNew && this.image === null);
        },
        "User Image Is Required",
      ],
    },*/
  },
  { timestamps: true }
);
const Category = model("Category", categorySchema);
module.exports = Category;
