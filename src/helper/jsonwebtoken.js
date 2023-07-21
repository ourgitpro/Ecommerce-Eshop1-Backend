const jwt = require("jsonwebtoken");

const createJSONWebToken = (payload, secretKey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    throw new Error("payload must ne object");
  }
  if (typeof secretKey !== "string" || secretKey === "") {
    throw new Error("secret key  must ne string");
  }
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
  } catch (error) {
    console.error('Error signing JWT:',error)
    throw error
  }
};
module.exports = { createJSONWebToken };
