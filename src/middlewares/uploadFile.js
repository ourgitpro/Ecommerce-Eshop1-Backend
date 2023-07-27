//const createError = require("http-errors");
//const multer = require("multer");
//const path = require("path");
//const { uploadDir } = require("../secret");
//const UPLOAD_DIR = uploadDir;
//const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE;
//const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES;
//const {
  //UPLOAD_USERS_IMG_DIRECTORY,
  //MAX_FILE_SIZE,
  //ALLOWED_FILE_TYPES,
//} = require("../config");
/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(
      null,
      file.fieldname + "-" + file.originalname.replace(extname, "") + extname
    );
  },
});
//const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    const error = createError(400, "File type does not exist");
    return cb(error);
  }
  cb(null, true);
};
//const fileFilter = (req, file, cb) => {
 // if (!file.mimeType.startsWith("image/")) {
  //  return cb(new Error("Only Image files are allaowed"), false);
  //}
  //if (file.size > MAX_FILE_SIZE) {
   // return cb(new Error("File size ecced the maximum limits are "), false);
 // }
  //if (!ALLOWED_FILE_TYPES.includes(file.mimeType)) {
   // return cb(new Error("Only Image files are allaowed jpg,jpeg,png"), false);
  //}
 // cb(null, true);
//};
const upload = multer({
  storage: storage,

  fileFilter: fileFilter,
});
module.exports = upload;*/

const createError = require("http-errors");
const multer = require("multer");
const path = require("path");
const {
  UPLOAD_USERS_IMG_DIRECTORY,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
} = require("../config");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only Image files are allowed"), false);
  }
  if (file.size > MAX_FILE_SIZE) {
    return cb(new Error("File size exceeds the maximum limit"), false);
  }
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(
      new Error("Only Image files are allowed (jpg, jpeg, png)"),
      false
    );
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
