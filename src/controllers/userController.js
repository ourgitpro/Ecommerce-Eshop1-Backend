const createError = require("http-errors");
const { jwtActivationKey, clientURL, jwtResetKey } = require("../secret");

const fs = require("fs");
const path = require("path");

const { promisify } = require("util");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const emailWithNodeMaier = require("../helper/email");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
//const unlinkAsync = promisify(fs.unlink);
/*const deleteUser = async (req, res, next) => {
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
};*/
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    console.log("User object:", user);

    if (user.image) {
      // Clear the image buffer from the user document
      user.image = null;
      await user.save();
    } else {
      console.log("User does not have an image.");
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
    if (!req.file) {
    }
    const imageBufferString = req.file.buffer.toString("base64");

    //console.log(imageBufferString);
    // Get the file path of the uploaded image
    //const imagePath = req.file ? req.file.path : null;
    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError(409, "This user email already exists");
    }
    //create jwt token
    const token = createJSONWebToken(
      { name, email, password, phone, address, image: imageBufferString },
      jwtActivationKey,
      "10m"
    );
    //prepare email
    const emailData = {
      email,
      subject: "Account Activation Mail",
      html: `
        <h2>Hello ${name}</h2>
        <p>please click here to <a href="${clientURL}/api/users/activate/${token}" target="_blank">Activate Here</a> </p>
        
      `,
    };

    //email send with nodemailer
    try {
      await emailWithNodeMaier(emailData);
    } catch (error) {
      console.error("error sending mail:", error);
      throw error;
    }

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
const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateOptions = { new: true, runValidators: true, context: "query" };
    let updates = {};
    if (req.body.name) {
      updates.name = req.body.name;
    }
    if (req.body.password) {
      updates.password = req.body.password;
    }
    if (req.body.phone) {
      updates.phone = req.body.phone;
    }
    if (req.body.address) {
      updates.address = req.body.address;
    }

    const image = req.file;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(404, "File too large. It must be 2 MB or smaller.");
      }
      updates.image = image.buffer.toString("base64");
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    );
    return successResponse(res, {
      statusCode: 200,
      message: "User update successfully by Nahid",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
const activateUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) throw createError(404, "Token not found");
    const decoded = jwt.verify(token, jwtActivationKey);

    await User.create(decoded);
    return successResponse(res, {
      statusCode: 201,
      message: "User  successfully register by Nahid",
    });
  } catch (error) {
    next(error);
  }
};
const handleBanUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    await findWithId(User, id);
    const updates = { isBanned: true };
    const updateOptions = { new: true, runValidators: true, context: "query" };

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      updateOptions
    );
    if (!updatedUser) {
      throw createError(404, "user not banned successfully");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User banned successfully by Nahid",
    });
  } catch (error) {
    next(error);
  }
};
const handleUnBanUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    await findWithId(User, id);
    const updates = { isBanned: false };
    const updateOptions = { new: true, runValidators: true, context: "query" };

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      updateOptions
    );
    if (!updatedUser) {
      throw createError(404, "user not banned successfully");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User un-banned successfully by Nahid",
    });
  } catch (error) {
    next(error);
  }
};
const handleUpdatePasswordById = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword, confirmedPassword } = req.body;
    const userId = req.params.id;
    const user = await findWithId(User, userId);
    //compare the password
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      throw createError(404, "OldPassword did not match ");
    }
    const filter = { userId };
    const updates = { $set: { password: newPassword } };
    const updateOptions = { new: true };
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    );
    if (!updatedUser) {
      throw createError(404, "user password not update successfully");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User password update successfully by Nahid",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};
const handleForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email: email });
    if (!userData) {
      throw createError(404, "User not found");
    }
    const token = createJSONWebToken({ email }, jwtResetKey, "10m");
    //prepare email
    const emailData = {
      email,
      subject: "Reset Password Email",
      html: `
      <h2>Hello ${userData.name}</h2>
      <p>please click here to <a href="${clientURL}/api/users/reset-password/${token}" target="_blank">Reset Your Password</a> </p>
      
    `,
    };

    //email send with nodemailer
    try {
      await emailWithNodeMaier(emailData);
    } catch (error) {
      console.error("error sending mail:", error);
      throw error;
    }

    return successResponse(res, {
      statusCode: 200,
      message: "user reset password  is  successfully by Nahid",
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};
const handleResetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, jwtResetKey);
    if (!decoded) {
      throw createError(400, "Invalid token provided in decode response");
    }
    const userId = req.params.id;
    const user = await findWithId(User, userId);
    const filter = { email: decoded.email };
    const updates = { password: password };
    const updateOptions = { new: true };
    const updatedUser = await User.findOneAndUpdate(
      filter,

      updates,
      updateOptions
    );
    if (!updatedUser) {
      throw createError(404, "user password not update successfully");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User reset password  successfully by Nahid",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUsers,
  getUser,
  deleteUser,
  processRegister,
  activateUserAccount,
  updateUserById,
  handleBanUserById,
  handleUpdatePasswordById,
  handleForgetPassword,
  handleResetPassword,
  handleUnBanUserById
};
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
//handleResetPassword
/*
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Assuming you have the necessary import statements and middleware setup

const handleResetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, jwtResetKey);
    
    if (!decoded) {
      throw createError(400, "Invalid token provided in decode response");
    }
    
    const userId = req.params.id;
    // Find the user using userId
    const user = await User.findById(userId);
    
    if (!user) {
      throw createError(404, "User not found");
    }
    
    // Update user's password
    user.password = password;
    const updatedUser = await user.save();
    
    return res.status(200).json({
      message: "User reset password successfully by Nahid",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

userRouter.put("/reset-password/:id", handleResetPassword);

*/
