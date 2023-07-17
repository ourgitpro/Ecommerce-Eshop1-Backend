const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
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
      type: String,
    },
    address: {
      type: String,
      required: [true, "User address Is Required"],
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
