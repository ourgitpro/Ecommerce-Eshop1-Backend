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
  updateUserById
} = require("../controllers/userController");
const { validateUserRegistration } = require("../validators/auth");
const { runValidation } = require("../validators/index.js");
const upload = require("../middlewares/uploadFile");
const userRouter = express.Router();

userRouter.post(
  "/process-register",

  upload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/verify", activateUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id",upload.single("image"), updateUserById);

module.exports = userRouter;
