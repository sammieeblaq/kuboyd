const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
require("dotenv").config();

// const adminRoute = require("../routes/admin.routes");
// const reviewRoute = require("../routes/review.routes");
// const reservationRoute = require("../routes/reservation.routes");

app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.set("useCreateIndex", true);

// app.use("/admin", adminRoute);
// app.use("/", reservationRoute);
// app.use("/", reviewRoute);

module.exports = app;
