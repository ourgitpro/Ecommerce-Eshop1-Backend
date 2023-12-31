require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 3002;
const mongodbUrl = process.env.MONGODB_URL;
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "yyyuyuyfudddyu";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "yyyuyuyfudddyu";
const jwtResetKey= process.env.JWT_RESET_PASSWORD_KEY|| "hdhhdsuhhh"
const jwtRefreshKey= process.env.JWT_REFRESH_KEY || "jjhbgygyggygf"
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
  jwtAccessKey,
  jwtResetKey,
  jwtRefreshKey
};
