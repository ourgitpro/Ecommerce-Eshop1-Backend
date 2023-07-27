const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name Is Required"],
      trim: true,
      minlength: [3, "User name Min Length"],
      maxlength: [31, "User name Max Length"],
    },
    email: {
      type: String,
      required: [true, "User Email Is Required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
      },
    },
    password: {
      type: String,
      required: [true, "User password Is Required"],

      minlength: [6, "User name Min Length"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
     image: {
      type: Buffer,
      contentType:String,
      required:false,
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
    address: {
      type: String,
      required: [true, "User address Is Required"],
      minlength: [3, "Address Min Length"],
    },
    phone: {
      type: String,
      required: [true, "User phone Is Required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = model("Users", userSchema);
module.exports = User;
