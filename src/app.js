const express = require("express");
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
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

//server error handelling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    messgae: err.message,
  });
});
module.exports = app;
