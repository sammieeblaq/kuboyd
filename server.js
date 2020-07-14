const connectDb = require("./config/db");
// const app = require("./src/app/app");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
// const mongoose = require("mongoose");
const compression = require("compression");
// const session = require("express-session");
connectDb();

const routes = require("./routes");

app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Main function to connect to the database
app.use("/", routes);

app.get("/", (req, res) =>
  res.status(200).json({ message: "KUBOYD APP successful" })
);

app.listen(process.env.PORT || process.env.port, (err) => {
  if (err) console.err(err);
  console.info(`Server started on port ${process.env.port}`);
});
