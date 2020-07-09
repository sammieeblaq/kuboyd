const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
const session = require("express-session");

const routes = require("../routes");

app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

module.exports = app;
