const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;
mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger); // Enabling the error logger
app.use(errors()); // Celebrate error handler middleware
app.use(errorHandler); // Error handler middleware

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
