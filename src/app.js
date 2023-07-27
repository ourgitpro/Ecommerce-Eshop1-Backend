/*const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const {errorResponse} = require("./controllers/responseController");
const userRouter = require("./routers/userRouters");
const seedRouter = require("./routers/seedRouter");
const app = express();
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  messgae: "too many requests per `window`",
});

// Apply the rate limiting middleware to API calls only
app.use(apiLimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/seeds", seedRouter);
app.get("/test", (req, res) => {
  res.status(200).send({
    message: "welcome to the server in test perpaush with status code",
  });
});

//frontend error handelling
//app.use((req, res, next) => {
 // next(createError(404, "route not found"));
//});
// frontend error handling middleware (updated)
app.use((req, res, next) => {
  return errorResponse(res, {
    statusCode: 404,
    message: "Route not found",
  });
});
//server error handelling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    messgae: err.message,
  });
});
module.exports = app;*/
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const { errorResponse } = require("./controllers/responseController");
const userRouter = require("./routers/userRouters");
const seedRouter = require("./routers/seedRouter");
const app = express();
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  messgae: "too many requests per `window`",
});

// Apply the rate limiting middleware to API calls only
app.use(apiLimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/seeds", seedRouter);
app.get("/test", (req, res) => {
  res.status(200).send({
    message: "welcome to the server in test perpaush with status code",
  });
});

// frontend error handling middleware
app.use((req, res, next) => {
  return errorResponse(res, {
    statusCode: 404,
    message: "Route not found",
  });
});

// server error handling middleware
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;

