require("dotenv").config();
const connectDb = require("./config/db");
// const app = require("./src/app/app");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
// const session = require("express-session");
connectDb();

app.use(logger("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.status(200).json({ message: "KUBOYD APP successful" })
);

const routes = require("./routes");
// Main function to connect to the database
app.use("/", routes);

app.listen(process.env.PORT || process.env.port, (err) => {
  if (err) console.err(err);
  console.info(`Server started on port ${process.env.port} ✔ `);
});
