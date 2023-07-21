const createError = require("http-errors");
const { jwtActivationKey } = require("../secret");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
const { createJSONWebToken } = require("../helper/jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();
    if (!users) throw createError(404, "no user found");
    /* res.status(200).send({
      message: "user profile is return",
      users,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });*/
    return successResponse(res, {
      statusCode: 200,
      message: "user profile is return successfully by Nahid",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);
    return successResponse(res, {
      statusCode: 200,
      message: "user profile is return successfully by Nahid",
      payload: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};
/*const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(id, options);

    const userImagePath = user.image;
    fs.access(userImagePath, (err) => {
      if (err) {
        console.error("User image does not exits properly");
      } else {
        fs.unlink(userImagePath, (err) => {
          if (err) throw err;
          console.log("user image was deleted");
        });
      }
    });
    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });
    return successResponse(res, {
      statusCode: 200,
      message: "user delete successfully by Nahid",
    });
  } catch (error) {
    next(error);
  }
};*/
const unlinkAsync = promisify(fs.unlink);
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    console.log("User object:", user);

    const userImagePath = user.image;

    if (userImagePath) {
      const imagePath = path.join(__dirname, "../", userImagePath);
      console.log("User image path:", imagePath);

      try {
        await unlinkAsync(imagePath);
        console.log("User image was deleted");
      } catch (err) {
        console.error("Error deleting user image:", err);
      }
    }

    await User.findByIdAndDelete(id);

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully by Nahid",
    });
  } catch (error) {
    next(error);
  }
};
const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError(409, "This user email already exists");
    }
    //create jwt token
    const token = createJSONWebToken(
      { name, email, password, phone, address },
      jwtActivationKey,
      "10m"
    );
    //prepare email
    //email send with nodemailer
    /* const newUser = {
      name,
      email,
      password,
      phone,
      address,
    };*/
    return successResponse(res, {
      statusCode: 200,
      message: "user profile is  successfully by Nahid",
      payload: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getUsers, getUser, deleteUser, processRegister };
/*
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(id, options);

    console.log("User object:", user); // Check the user object here

   /* const userImagePath = user.image;
    console.log("User image path:", userImagePath);

    fs.access(userImagePath, (err) => {
      if (err) {
        console.error("Error accessing user image:", err);
      } else {
        fs.unlink(userImagePath, (err) => {
          if (err) {
            console.error("Error deleting user image:", err);
          } else {
            console.log("User image was deleted");
          }
        });
      }
    });

    await User.findByIdAndDelete(id); // Corrected the usage of findByIdAndDelete

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully by Nahid",
    });
  } catch (error) {
    next(error);
  }
};*/
