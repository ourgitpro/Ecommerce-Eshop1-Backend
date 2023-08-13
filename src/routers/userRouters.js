/*const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
  processRegister,
  activateUserAccount,
} = require("../controllers/userController");
const { validateUserRegistration } = require("../validators/auth");
const { runValidation  } = require("../validators/index.js");
const upload = require("../middlewares/uploadFile");
const userRouter = express.Router();
userRouter.post(
  "/process-register",
  validateUserRegistration,
  runValidation ,
  upload.single("image"),
  processRegister
);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
module.exports = userRouter;*/
const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
  processRegister,
  activateUserAccount,
  updateUserById,
  handleBanUserById,
  handleUpdatePasswordById,
  handleForgetPassword,
  handleResetPassword
} = require("../controllers/userController");
const cookieParser = require("cookie-parser");
const { validateUserRegistration } = require("../validators/auth");
const { runValidation } = require("../validators/index.js");
const upload = require("../middlewares/uploadFile");
const { isLoggedIn, isLoggOut, isAdmin } = require("../middlewares/auth");
const userRouter = express.Router();
userRouter.use(cookieParser());
userRouter.post(
  "/process-register",

  upload.single("image"),
  isLoggOut,
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/verify", isLoggOut, activateUserAccount);
userRouter.get("/", isLoggedIn, isAdmin, getUsers);
userRouter.get("/:id", isLoggedIn, getUser);
userRouter.delete("/:id", isLoggedIn, deleteUser);
userRouter.put("/:id", upload.single("image"), isLoggedIn, updateUserById);
userRouter.put("/ban-user/:id", isLoggedIn, isAdmin, handleBanUserById);
userRouter.put("/update-password/:id", isLoggedIn, handleUpdatePasswordById);
userRouter.post("/forget-password/:id", handleForgetPassword );
userRouter.put("/reset-password/:id",   handleResetPassword );
module.exports = userRouter;
