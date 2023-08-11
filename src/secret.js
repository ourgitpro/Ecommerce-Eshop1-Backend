require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 3002;
const mongodbUrl = process.env.MONGODB_URL;
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "yyyuyuyfudddyu";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "yyyuyuyfudddyu";
const smtpUsername = process.env.SMPT_MAIL;
const smtpPassword = process.env.SMPT_PASSWORD;
const clientURL = process.env.CLIENT_URL
const uploadDir= process.env.UPLOAD_FILE
module.exports = {
  serverPort,
  mongodbUrl,
  jwtActivationKey,
  smtpUsername,
  smtpPassword,
  clientURL,
  uploadDir,
  jwtAccessKey
};
