require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 3002;
const mongodbUrl = process.env.MONGODB_URL;
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "yyyuyuyfudddyu";
const smtpUsername = process.env.SMPT_MAIL;
const smtpPassword = process.env.SMPT_PASSWORD;
module.exports = {
  serverPort,
  mongodbUrl,
  jwtActivationKey,
  smtpUsername,
  smtpPassword,
};
