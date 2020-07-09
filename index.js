const connectDb = require("./src/config/db");
const app = require("./src/app/app");

// Main function to connect to the database
connectDb();

app.listen(process.env.PORT || process.env.port, (err) => {
  if (err) console.err(err);
  console.info(`Server started on port ${process.env.PORT}`);
});
